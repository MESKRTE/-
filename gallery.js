document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const modal = document.getElementById('detail-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');

    // モーダルを閉じる
    closeModal.addEventListener('click', () => modal.classList.remove('show'));
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('show');
    });

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

        // クリックで詳細モーダルを開く
        card.addEventListener('click', () => showDetail(item));

        return card;
    }

    function showDetail(item) {
        modalTitle.textContent = `${item.name} の詳細`;
        
        let html = `<div style="flex:1; display:flex; flex-direction:column; gap:15px;">`;
        
        // 画像
        if (item.state.characterImage) {
            html += `<div style="text-align:center;"><img src="${item.state.characterImage}" style="max-width:100%; max-height:300px; border:1px solid var(--accent-gold); border-radius:4px;"></div>`;
        }

        // 基本ステータス
        const finalLevel = calculateLevel(item.state);
        html += `<h4 style="color:var(--accent-gold); border-bottom:1px solid #555; margin:0; padding-bottom:5px;">ステータス</h4>`;
        html += `<div style="display:inline-block; background:rgba(0,0,0,0.3); padding:10px 20px; border-radius:4px; border:1px solid var(--border-color);">
            <strong style="color:#aaa;">推定最終Lv: </strong>
            <span style="color:var(--accent-red); font-size:1.5rem; font-weight:bold; margin-left:10px;">${finalLevel}</span>
        </div>`;

        const labels = {
            limitLevel: "限界レベル", origin: "出身", ability: "能力値", item: "特殊アイテム", talent: "タレント", connection: "コネクション"
        };

        html += `<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:10px;">`;
        for (const [key, label] of Object.entries(labels)) {
            const rank = item.state.selections[key] || "未設定";
            const text = item.state.freeText ? (item.state.freeText[key] || "") : "";
            html += `<div style="background:rgba(0,0,0,0.3); padding:10px; border-radius:4px; border:1px solid var(--border-color);">
                        <strong style="color:#aaa; font-size:0.85rem;">${label}</strong><br>
                        <span style="font-weight:bold; color:var(--accent-gold); font-size:1.1rem;">ランク ${rank}</span>
                        ${text ? `<div style="font-size:0.9rem; margin-top:8px; color:#ddd; white-space:pre-wrap; border-top:1px dashed #555; padding-top:8px;">${text}</div>` : ''}
                     </div>`;
        }
        html += `</div>`;

        // ラスボス設定
        if (item.state.lastBossResult) {
            html += `<h4 style="color:var(--accent-gold); border-bottom:1px solid #555; margin:5px 0 0; padding-bottom:5px;">ラスボス設定</h4>`;
            html += `<div style="background:rgba(138,14,14,0.1); padding:15px; border:1px solid var(--accent-red); border-radius:4px; font-size:0.95rem; white-space:pre-wrap; color:var(--text-color);">${item.state.lastBossResult.text}</div>`;
        }

        html += `</div>`;
        
        html += `<div style="margin-top: 20px; display: flex; gap: 10px; justify-content: center;">
            <button id="modal-load-btn" class="btn primary" style="padding: 10px 20px;">作成ツールで読み込む</button>
            <button id="modal-delete-btn" class="btn secondary" style="background: var(--accent-red); border-color: var(--accent-red); padding: 10px 20px; color: #fff;">削除する</button>
        </div>`;
        
        modalBody.innerHTML = html;

        document.getElementById('modal-load-btn').addEventListener('click', () => {
            window.location.href = `index.html?load=${item.id}`;
        });

        document.getElementById('modal-delete-btn').addEventListener('click', () => {
            const pwd = prompt("削除用のパスワードを入力してください（未設定の場合はそのままOK）:");
            if (pwd === null) return;
            
            const gasUrl = "https://script.google.com/macros/s/AKfycbyJDSVse4RXvoN_pZPRvsNqnliFS2mm83FDT7ZGpI2XWkNF50ZC9aco4mWBhZ20E2g/exec";
            const payload = {
                action: "delete",
                id: item.id,
                password: pwd
            };
            
            fetch(gasUrl, {
                method: 'POST',
                body: new URLSearchParams({ payload: JSON.stringify(payload) })
            })
            .then(res => res.json())
            .then(data => {
                if (data.result === "success") {
                    alert("キャラクターを削除しました。");
                    modal.classList.remove('show');
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

        modal.classList.add('show');
    }

    loadGallery();
});
