document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');

    // データの読み込み
    function loadGallery() {
        galleryContainer.innerHTML = '<p style="text-align:center; width:100%; color:#aaa; grid-column: 1 / -1;">データを読み込み中...</p>';
        
        const gasUrl = "https://script.google.com/macros/s/AKfycbyJDSVse4RXvoN_pZPRvsNqnliFS2mm83FDT7ZGpI2XWkNF50ZC9aco4mWBhZ20E2g/exec";

        fetch(gasUrl)
            .then(response => response.json())
            .then(galleryData => {
                if (!galleryData || galleryData.length === 0) {
                    galleryContainer.innerHTML = '<p style="text-align:center; width:100%; color:#aaa; grid-column: 1 / -1;">まだ誰も公開していません。<br>作成ツールから「ギャラリーに公開」ボタンを押して登録してください。</p>';
                    return;
                }

                galleryContainer.innerHTML = '';
                // 新しい順に表示 (スプレッドシートは下に追加されていくためリバース)
                galleryData.reverse().forEach(item => {
                    const card = createCard(item);
                    galleryContainer.appendChild(card);
                });
            })
            .catch(error => {
                console.error(error);
                galleryContainer.innerHTML = '<p style="text-align:center; width:100%; color:red; grid-column: 1 / -1;">データの読み込みに失敗しました。<br>時間をおいて再読み込みしてください。</p>';
            });
    }

    function calculateLevel(state) {
        const baseLevel = state.selections.limitLevel ? parseInt(getRankLevel(state.selections.limitLevel)) || 0 : 0;
        let bonus = 0;
        if (state.selections.origin) {
            const factor = state.customOriginFactor !== null ? state.customOriginFactor : getOriginFactor(state.selections.origin);
            bonus = Math.max(0, (baseLevel - 20) * factor);
        }
        return Math.round((baseLevel + bonus) * 10) / 10;
    }

    function getRankLevel(rank) {
        const levels = {S: 41, A: 35, B: 31, C: 28, D: 24, E: 19};
        return levels[rank] || 0;
    }

    function getOriginFactor(rank) {
        const factors = {S: 0.6, A: 0.3, B: 0.1, C: 0, D: 0, E: 0};
        return factors[rank] || 0;
    }

    function createCard(item) {
        const card = document.createElement('div');
        card.className = 'gallery-card';

        const imgContainer = document.createElement('div');
        imgContainer.className = 'gallery-img-container';
        if (item.state && item.state.characterImage) {
            const img = document.createElement('img');
            img.src = item.state.characterImage;
            imgContainer.appendChild(img);
        } else {
            const noImg = document.createElement('div');
            noImg.className = 'gallery-no-img';
            noImg.textContent = 'NO IMAGE';
            imgContainer.appendChild(noImg);
        }
        card.appendChild(imgContainer);

        const name = document.createElement('h3');
        name.className = 'gallery-name';
        name.textContent = item.name;
        card.appendChild(name);

        const stats = document.createElement('div');
        stats.className = 'gallery-stats';

        const finalLevel = calculateLevel(item.state);
        
        const rankLabels = {
            limitLevel: "限界Lv", origin: "出身", ability: "能力値",
            item: "アイテム", talent: "タレント", connection: "コネ"
        };

        const levelRow = document.createElement('div');
        levelRow.className = 'gallery-stat-row';
        levelRow.innerHTML = `<span class="gallery-stat-label">推定最終Lv</span><span class="gallery-stat-value highlight" title="${finalLevel}">${finalLevel}</span>`;
        stats.appendChild(levelRow);

        ['limitLevel', 'origin', 'ability', 'item', 'talent', 'connection'].forEach(key => {
            const row = document.createElement('div');
            row.className = 'gallery-stat-row';
            const val = item.state.selections[key] ? `ランク ${item.state.selections[key]}` : '未設定';
            row.innerHTML = `<span class="gallery-stat-label">${rankLabels[key]}</span><span class="gallery-stat-value" title="${val}">${val}</span>`;
            stats.appendChild(row);
        });

        const bossRow = document.createElement('div');
        bossRow.className = 'gallery-stat-row';
        let bossVal = '未設定';
        if (item.state.lastBossResult) {
            if (item.state.lastBossResult.dataKey === 0 || item.state.lastBossResult.dataKey === "0") {
                bossVal = 'なし';
            } else {
                const parts = item.state.lastBossResult.text.trim().split('\n');
                bossVal = parts[parts.length - 1]; // 通常、最後の行にボス名が入る
            }
        }
        bossRow.innerHTML = `<span class="gallery-stat-label">ラスボス</span><span class="gallery-stat-value" title="${bossVal}">${bossVal}</span>`;
        stats.appendChild(bossRow);

        card.appendChild(stats);

        // ゴミ箱（削除）ボタンの追加
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.className = 'gallery-delete-btn';
        deleteBtn.title = 'ギャラリーから削除';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // カードクリックによる画面遷移をブロック
            const pwd = prompt("削除用のパスワードを入力してください（未設定の場合はそのままOK）:");
            if (pwd === null) return;
            
            const gasUrl = "https://script.google.com/macros/s/AKfycbyJDSVse4RXvoN_pZPRvsNqnliFS2mm83FDT7ZGpI2XWkNF50ZC9aco4mWBhZ20E2g/exec";
            const payload = { action: "delete", id: item.id, password: pwd };
            
            fetch(gasUrl, {
                method: 'POST',
                body: new URLSearchParams({ payload: JSON.stringify(payload) })
            })
            .then(res => res.json())
            .then(data => {
                if (data.result === "success") {
                    alert("キャラクターを削除しました。");
                    loadGallery();
                } else {
                    alert("エラー: " + (data.message || "パスワードが間違っています。"));
                }
            })
            .catch(err => {
                console.error(err);
                alert("通信エラーが発生しました。");
            });
        });
        card.appendChild(deleteBtn);

        // カード全体クリックで作成ツールに遷移
        card.addEventListener('click', () => {
            window.location.href = `index.html?load=${item.id}`;
        });

        return card;
    }



    loadGallery();
});
