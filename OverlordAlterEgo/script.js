const CARD_TYPES = ['S', 'A', 'B', 'C', 'D', 'E'];

// Data definition - Updated with minBonus for sliders
const OVERLORD_DATA = {
    limitLevel: {
        S: {
            level: 41,
            desc: "限界レベル：41\n10か国以上から嫁婿入り希望されるレベル。個人戦闘能力は国家レベルの暴力（替えがない）。周辺の強者が協力して殺しにかからない限りほぼ無敵。",
            originalText: "限界レベル：\n\nあなたの分身の限界レベルです。このレベルまで成長できますが、だからと言ってその途中で死なないとも限りません。設定上、このレベルを目指して冒険しているとかでも全然大丈夫です。将来、ここまで強くなれるんだ、みたいに思ってください。\n\nSのカードを使った人は41レベル\n\nになります。\n※そしてこのレベルこそが異性をどれだけ引き付けるか、という指標にもなります。限界まで強くなる（なおかつ目立つような、もしくは普通の行動をしている）とこんな感じです。\n\nS：10か国以上から嫁婿入り希望されるレベル。付き纏う異性で困って逃げ出したくなるレベルでもあります。もしかすると同性も。というよりも同性からもモテますよ、きっと。\n\nSが国家レベルの暴力（替えがない）\nSとか個人でも絶対に敵に回したくない感じが伝わってくれると嬉しいです。\n……ならSは無敵、なのか？　というと、どこかで書いた気がするんですけど、周辺のあなたより少し弱いぐらいの強者が協力して殺しにかかるので、絶対に無敵ということではないです。\nあまり多くの相手を敵に回したりしない方がいい、ってことですね。"
        },
        A: {
            level: 35,
            desc: "限界レベル：35\n数か国ぐらいから嫁婿入り希望されるレベル。個人戦闘能力は国家レベルの暴力（替えがあるかも）。国家バランスを崩しかねない力。",
            originalText: "限界レベル：\n\nあなたの分身の限界レベルです。\n\nAのカードを使った人は35レベル\n\nになります。\n※そしてこのレベルこそが異性をどれだけ引き付けるか、という指標にもなります。\n\nA：数か国ぐらいから嫁婿入り希望されるレベル。場合によっては周辺国家が話し合いでそれぞれの国から王族なり貴族の異性を押し付けようとするかもしれません。だって、あなたの力は国家のバランスを崩しかねないのですから。\n\nAが国家レベルの暴力（替えがあるかも）"
        },
        B: {
            level: 31,
            desc: "限界レベル：31\n大貴族、王族から嫁婿の話が来るレベル。個人戦闘能力は周辺複数都市レベル。",
            originalText: "限界レベル：\n\nあなたの分身の限界レベルです。\n\nBのカードを使った人は31レベル\n\nになります。\n※そしてこのレベルこそが異性をどれだけ引き付けるか、という指標にもなります。\n\nB：あなたの住む国の大貴族、王族から嫁、婿の話が来ます。\n\nBが周辺複数都市レベル"
        },
        C: {
            level: 28,
            desc: "限界レベル：28\n大貴族から嫁婿の話が来るレベル。個人戦闘能力は大都市クラス。",
            originalText: "限界レベル：\n\nあなたの分身の限界レベルです。\n\nCのカードを使った人は28レベル\n\nになります。\n※そしてこのレベルこそが異性をどれだけ引き付けるか、という指標にもなります。\n\nC：大貴族から嫁、婿の話が来るでしょう。\n\nCが大都市クラス"
        },
        D: {
            level: 24,
            desc: "限界レベル：24\n大都市で一番と言われる異性と結ばれる可能性が高い。個人戦闘能力は中都市レベル。",
            originalText: "限界レベル：\n\nあなたの分身の限界レベルです。\n\nDのカードを使った人は24レベル\n\nになります。\n※そしてこのレベルこそが異性をどれだけ引き付けるか、という指標にもなります。\n\nD：大都市で一番と言われる異性と結ばれる可能性は非常に高いです。もしくは中堅貴族辺りが嫁や婿の話を持ってくるかも。\n\nDが中都市レベル"
        },
        E: {
            level: 19,
            desc: "限界レベル：19\n小さな都市で一番と言われる異性と結ばれる可能性が高い。個人戦闘能力は小都市レベル。",
            originalText: "限界レベル：\n\nあなたの分身の限界レベルです。\n\nEのカードを使った人は19レベル\n\nになります。\n※そしてこのレベルこそが異性をどれだけ引き付けるか、という指標にもなります。\n\nE：小さな都市で一番と言われる異性と結ばれる可能性は非常に高いです。\n\nEが小都市レベル\nつまり、Eを敵にすると小都市を相手にするような感じ、ってことかな？"
        }
    },
    origin: {
        S: {
            type: 'Reincarnated', bonusFactor: 0.6, minBonus: 0.1, fixedBonus: 0, desc: "出身：転生者\nユグドラシルの知識を持つ。「最上級職」を習得できるチャンス。\nボーナス計算：(上限Lv - 20) × 0.6",
            originalText: "出身：\n\nSのカードを使った人は転生者。\nあなたはユグドラシルの知識を持っています。これはあなたがあの糞みたいな世界の住人だったのかもしれないし、オーバーロードの読者だったのかもしれません。後者であればなんと悲劇的な話でしょう。よりによってオーバーロードの世界とは……。もっと良い世界が幾らでもあっただろうに……。もしかして罰なのかもしれませんね。修羅道に落とされたとか。\n……まぁ、嘆いていても仕方がありません。あなたはその特別な生まれよりくる知識によって、20レベル以降最上級職（ユグドラシルで言うところの75レベル以降習得クラス）を習得できるチャンスを得られます。及び、基本職からのスタートを可能とします。\n※あなたは能力が高いだけではなく、切り札を持っている可能性が高く、上手くやれば格上にさえ勝てます。\n上限レベルから20を引いた数字に0.6をかけてください。そして出てきた数字を限界レベルに加算してください。\nそれぐらいと同等だということです。ただし注意しなくてはならないのは、あなたの能力が知られていない状況に限る、ということです。\n知られれば知られるほど、その倍率は下がっていき、最後は0.1ほどになるでしょう。\n……限界レベルが高い人ほど、周囲に異性がいる可能性が高いことをお忘れなく。裏切らない？　喋らない？　この世界には魅了などの精神操作系ありますよ？"
        },
        A: {
            type: 'Special', bonusFactor: 0.3, minBonus: 0.1, fixedBonus: 0, desc: "出身：特異（暗殺教団など）\n特別な技術体系を持つ生まれ。「上級職」を習得できるチャンス。\nボーナス計算：(上限Lv - 20) × 0.3",
            originalText: "出身：\n\nAのカードを使った人は特異。\nあなたは暗殺教団かもしれない、特別な修道会かもしれない生まれを持ちます。得てしてそういった集団は特別な技術体系を先人の多くの犠牲から生み出し、受け継いできています。あなたは20レベル以降上級職（ユグドラシルで言うところの50レベル以降習得クラス）を習得できるチャンスを得られます。及び、基本職からのスタートを可能とします。\n※あなたは能力が高く、上手くやれば格上にさえ勝てます。上限レベルから20を引いた数字に0.3をかけてください。そして出てきた数字を限界レベルに加算してください。\nそれぐらいと同等だということです。\nただし注意しなくてはならないのは、あなたの能力が知られていない状況に限る、ということです。\n知られれば知られるほど、その倍率は下がっていき、最後は0.1ほどになるでしょう。"
        },
        B: {
            type: 'Noble', bonusFactor: 0.1, minBonus: 0.0, fixedBonus: 0, desc: "出身：上流階級（貴族や豪商）\n高い教育を受けられる。「中級職」を普通に得られる。\nボーナス計算：(上限Lv - 20) × 0.1",
            originalText: "出身：\n\nBのカードを使った人は上流階級。\nあなたは上流階級の出身です。貴族かもしれないし、豪商かもしれません。ただ、どちらにせよ言えることはあなたに高い教育をかけてくれることが可能だということです。20レベル以降中級職（ユグドラシルで言うところの25レベル以降習得クラス）を普通に得られます。及び、基本職からのスタートを可能とします。\n※あなたは能力が少し高く、優秀です。上限レベルから20を引いた数字に0.1をかけてください。出てきた数字を限界レベルに加算してください。\nそれぐらいと同等だということです。\nただし注意しなくてはならないのは、あなたの能力が知られていない状況に限る、ということです。\n知られれば知られるほど、その倍率は下がっていき、最後は0になるでしょう。"
        },
        C: {
            type: 'Middle', bonusFactor: 0.0, fixedBonus: 0, desc: "出身：中流階級\nそれなりに裕福。中級職は運次第。",
            originalText: "出身：\n\nCのカードを使った人は中級階級。\nあなたはそれなりに裕福な家に育ち、ある程度子供の教育にお金をかけることをしてくれました。なので、基本職からのスタートを可能とします。ただし、中級職を得られるかは運次第です。"
        },
        D: {
            type: 'Commoner', bonusFactor: 0.0, fixedBonus: 0, desc: "出身：市民\n有益な一般職業を強制的に2レベル習得している。",
            originalText: "出身：\n\nDのカードを使った人は市民。\nあなたは市民の生まれです。これは決して悪いことではありません。大抵の者が市民なんですから。ただ、若くして家計の助けになろうとしたのか、それとも家がそうなのかは知りませんが、有益な一般職業を強制的に2レベル習得してしまっています。これはあなたの限界レベルを考えるとデメリットにもなるでしょう。この一般職業は自由に選択して構いませんが、あなたが市民出身だということを忘れないように。"
        },
        E: {
            type: 'Slave', bonusFactor: 0.0, fixedBonus: 0, desc: "出身：奴隷などの不自由な階級\n無益な一般職を強制的に5レベル習得している。",
            originalText: "出身：\n\nEのカードを使った人は哀れな階級です。\nあなたは奴隷などの自由に職を選べない階級です。この場合、無益な一般職を強制的に5レベル習得します。職業は自由に選択しても構いませんが、鞭うたれて習得するような職業だということを忘れないようにしてください。"
        }
    },
    ability: {
        S: {
            adjustment: 0.5, desc: "能力値：天才 (+50%)\nレベル+50％相当の能力。レベルを超えた能力に相手は驚愕する。",
            originalText: "能力値：\n\nこれはあなたの素の能力（筋力とか知力とか、色々です）の才能の高さを意味しています。ここで高いカードを使った場合、限界レベルにプラス何％ということになります。\n\nSのカードを使った人は天才。\nレベル+50％\nあなたはまさに天才です。一を聞けば、十を理解することでしょう。\nレベルだけを絶対の指標とする相手と戦った時、きっと相手は目を見開き、あなたの才能から生じる、レベルを超えた能力に驚愕するでしょう。そしてその相手の混乱は致命的な深手を与えるチャンスを生んでくれることでしょう。\n\nそして能力値は絶対的な強者（真なる竜王やナザリック勢力など）がどれだけあなたのことを勧誘するか、にも表れてきます。\n　彼らのような超高位の存在からするとレベルよりも才能を重要視して勧誘する価値あり、となってくるわけです。\n　S：まず間違いなく一度は勧誘される。敗北したとしても命を助けられ、もう一度勧誘される。"
        },
        A: {
            adjustment: 0.25, desc: "能力値：秀才 (+25%)\nレベル+25％相当の能力。",
            originalText: "能力値：\n\nAのカードを使った人は秀才。\nレベル+25％\n天才には劣るものの、それでもあなたは非常に優れた才能を持ちます。努力する秀才ならきっと努力しない天才に勝つことと思います。\n\nそして能力値は絶対的な強者（真なる竜王やナザリック勢力など）がどれだけあなたのことを勧誘するか、にも表れてきます。\n　彼らのような超高位の存在からするとレベルよりも才能を重要視して勧誘する価値あり、となってくるわけです。\n　A：一度は勧誘されます。敗北した時は殺されるかどうかは運次第です。"
        },
        B: {
            adjustment: 0.1, desc: "能力値：才人 (+10%)\nレベル+10％相当の能力。",
            originalText: "能力値：\n\nBのカードを使った人は才人。\nレベル+10％\nある程度の才能を持ち、小規模の集団であれば頭角を示すことでしょう。教師役は見どころのあるやつだ、ときっとあなたのことを思うことでしょう。中規模、大規模になると天才や秀才が入ってきてしまうので、流石に二位や三位ぐらいになってしまうことは避けられません。\n\nそして能力値は絶対的な強者（真なる竜王やナザリック勢力など）がどれだけあなたのことを勧誘するか、にも表れてきます。\n　彼らのような超高位の存在からするとレベルよりも才能を重要視して勧誘する価値あり、となってくるわけです。\n　B以下は勧誘される確率はほぼないです。自分から売りこむ場合は、限界レベル次第というところでしょう。"
        },
        C: {
            adjustment: 0.0, desc: "能力値：平凡 (±0%)\n世間一般。",
            originalText: "能力値：\n\nCのカードを使った人は平凡。\n変化なし。\n何か感じることはないです。なぜなら、世間一般の人はこの領域なのですから。\n\nそして能力値は絶対的な強者（真なる竜王やナザリック勢力など）がどれだけあなたのことを勧誘するか、にも表れてきます。\n　彼らのような超高位の存在からするとレベルよりも才能を重要視して勧誘する価値あり、となってくるわけです。\n　B以下は勧誘される確率はほぼないです。自分から売りこむ場合は、限界レベル次第というところでしょう。"
        },
        D: {
            adjustment: -0.1, desc: "能力値：鈍才 (-10%)\nレベル-10％相当。努力が倍必要。",
            originalText: "能力値：\n\nDのカードを使った人は鈍才。\nレベル-10％。\n残念ながらあなたの道は若干険しいものとなります。人と同じだけの努力をしても、習得できるのは他の人々よりも劣ったものでしかありません。ですが、それで腐る必要はないのです。なら、人の倍、努力すれば良いのですから。\n\nそして能力値は絶対的な強者（真なる竜王やナザリック勢力など）がどれだけあなたのことを勧誘するか、にも表れてきます。\n　彼らのような超高位の存在からするとレベルよりも才能を重要視して勧誘する価値あり、となってくるわけです。\n　B以下は勧誘される確率はほぼないです。自分から売りこむ場合は、限界レベル次第というところでしょう。"
        },
        E: {
            adjustment: -0.2, desc: "能力値：丸山 (-20%)\nレベル-20％相当。才能がない。",
            originalText: "能力値：\n\nEのカードを使った人は丸山。\nレベル-20％。\nあなたには才能がない！　その道を選んだのは失敗だったのではないだろうか？　そんなあなたが生き残る道はたった一つだ。運である。もしそれに見放されれば……あなたの人生は非常に悲しいものになるだろう。\n\nそして能力値は絶対的な強者（真なる竜王やナザリック勢力など）がどれだけあなたのことを勧誘するか、にも表れてきます。\n　彼らのような超高位の存在からするとレベルよりも才能を重要視して勧誘する価値あり、となってくるわけです。\n　B以下は勧誘される確率はほぼないです。自分から売りこむ場合は、限界レベル次第というところでしょう。"
        }
    },
    item: {
        S: {
            adjustment: 0.0, desc: "特殊アイテム：世界級アイテム (World Item)\n所持しているだけで命を狙われるが、使えば一発逆転も可能。",
            originalText: "特殊アイテム：\n\nあなたが生まれてから生きてきた間に幸運にも得たアイテムです。\n\nSのカードを使った人は世界級アイテムを所有しています。\n……ねぇ、なんで、持ってるの？\n絶対に命狙われるよ？\n基本的にそれが戦闘用であれば使用すれば一発逆転も余裕で可能です。国家レベルの軍勢を相手にして勝てるかも知れません。防御やその他であればペナルティの一切ない完全なる死者の蘇生、ありとあらゆる傷や病気、毒からの回復、絶対なる防御などが出来るでしょう。\nおそらくそのアイテムを使用した場合、あなたに勝てるのは真なる竜王やプレイヤーぐらいでしょう。でも、使えば使うほど命を狙われる可能性が高くなります。刺客による暗殺、ハニートラップは日常になるかもしれませんね。複数回使用し運が悪ければ、必勝の準備をしたアインズが動きだすとかありえそうです。"
        },
        A: {
            adjustment: 0.0, desc: "特殊アイテム：ユグドラシル産/真なる竜王の一品\n十数か国レベルで名が知れ渡る一品。",
            originalText: "特殊アイテム：\n\nAのカードを使った人が所有するのはユグドラシル産、もしくは真なる竜王が作った一品。\n十数か国レベルで名が知れ渡るような一品です。それを差し出せば著名人ですら願いを聞いてくれるでしょう。それは真なる竜王でも過言ではありません。その反面、それ欲しさに命が狙われることもないわけではないです。5レベル差とかならきついかもしれませんが、ものによっては覆せます。"
        },
        B: {
            adjustment: 0.0, desc: "特殊アイテム：名工の魔化名品\n数か国レベルで名が知れる一品。",
            originalText: "特殊アイテム：\n\nBのカードを使った人が所有するのは名工の手によって作り出され、あの世界の高位の魔法詠唱者によって魔化が施されてある名品。\n数か国レベルで名が知れる一品になります。アダマンタイト級冒険者でも保有してないかもしれないものです。売れば数代にわたって裕福な暮らしができます。"
        },
        C: {
            adjustment: 0.0, desc: "特殊アイテム：一品もの\n代々受け継がれた魔法の力を宿すアイテム。",
            originalText: "特殊アイテム：\n\nCのカードを使った人が所有するのは一品もの。親から子へ、代々受け継いできたものです。\n凄い力があるわけでも、有名な伝説が残っているわけでもありませんが、魔法の力を宿し、購入するとかなり高額です。ものによってはあなたの身分を保証するものにもなるかもしれません。"
        },
        D: {
            adjustment: 0.0, desc: "特殊アイテム：魔法のない一品\n名工の剣や全身鎧など。",
            originalText: "特殊アイテム：\n\nDのカードを使った人が所有するのは魔法のこもっていない一品です。\n駆け出しの冒険者では手に入らないような、例えば全身鎧、それなりに名の知れた名工の鍛えた剣などがそれに妥当するでしょうか？"
        },
        E: {
            adjustment: -0.1, desc: "特殊アイテム：借金 (-10%)\n装備が整っていないため劣る。ペナルティ：限界レベル-10％相当。",
            originalText: "特殊アイテム：\n\nEのカードを使った人は逆に借金があります。\nあなたは親の所為なのか、自分の所為なのか、もっと別の所為なのかは分かりませんが、とにかく借金があります。もしくはありました。そのため、あなたは傭兵であれ、冒険者であれ、満足のいく武装が整いません。もしくは整っていません。そのため、限界レベル-10％と同等のペナルティを受けます。これはあなたがそのレベルに応じた武装をしていないため、同等の相手を敵に回した際にそれだけ劣る、ということを意味しています。なので、実際にレベルが下がっているということではありません。"
        }
    },
    talent: {
        S: {
            desc: "タレント：やばいもの\n100%耐性や、一日一回第八位階魔法など。",
            originalText: "タレント：\n\n生まれ持った異能のことです。\n\nSのカードを使った人は『やばい』ものです。\nゲーム的に言えば100％耐性などです。つまり炎に無敵などです。時には殴打に対して無敵などもあるでしょう。こういったタレントは使用回数制限や条件などがあればあるほど強くなります。例えば一日に一回だけ人間では到達不可能な第八位階魔法の一つを行使可能とする。もしくは一週間に一回だけ第十位階魔法の一つを発動可能とするとかはこのクラスでしょうか？　オーバーロードの魔法で第六位階の一つが日常的に使えるなども妥当かもしれません。……こういった魔法行使は凄いですけど、基準になるのがあなたの能力値なので、アインズの使うものと比較してかなり弱いなどのデメリットもあるかもしれませんね。好きにイメージしてください。"
        },
        A: {
            desc: "タレント：凄いもの\n50%耐性や、一日一回第六位階魔法など。",
            originalText: "タレント：\n\nAのカードを使った人は『凄い』ものです。\nゲームで言えば50％耐性です。一日一回だけ第六位階魔法を発動可能とするというのがこのクラスでしょうか？　一週間に一度なら第八位階とかですかね？　特別な目を持っているなどであれば全系統を見抜けるとかでしょう。"
        },
        B: {
            desc: "タレント：有益なもの\n筋力が常人より25%強い、魔力が見えるなど。",
            originalText: "タレント：\n\nBのカードを使った人は『有益』ものです。\n例えば筋力が普通の人よりも25％ほど強い、特別な目を持つ（魔力系統だけ見抜ける）、などです。"
        },
        C: {
            desc: "タレント：無益ではないもの\n水面を5歩歩ける、70%で天気予報ができるなど。",
            originalText: "タレント：\n\nCのカードを使った人は『無益ではないが、さほど有益でもない』ものです。\n例えば水面を五歩だけ沈まずに進める、的中率70％で明日の天気を予報できる。などです。他には0位階魔法じみた（奇術）のようなことができるなどでしょうか。指の先端にろうそく程度の小さな明かりを灯せる、とかもありそうですね。"
        },
        D: {
            desc: "タレント：なし",
            originalText: "タレント：\n\nDのカードを使った人は『なし』です。"
        },
        E: {
            desc: "タレント：なし（＋マイナス設定）\n自分で何かデメリットを設定してください。",
            originalText: "タレント：\n\nEのカードを使った人は『なし』です。\n本当はデメリットをつけたいところでしたけど、あんまりこれだというのが浮かびませんでした。なので、自分で何か適当なマイナスの設定を付け加えてください。それによってあなたの何かが一段階悪くなります。くそむかつく上司（マジで助けてくれない）の指示を受けて働いているとかでも良いですよ？"
        }
    },
    connection: {
        S: {
            desc: "コネクション：世界トップクラス組織のまとめ役\nアインズやツアーなど。魔導国の侵攻も止められるレベル。",
            originalText: "コネクション：\n\nあなたの実力に関与しないので軽く見がちかもしれませんが、決してバカにできたものではありません。\n\nSのカードを使った人は世界トップクラスの実力者組織のまとめ役とのコネを保有します。\n……なんで？\nまぁ、兎に角、これはアインズやツアーなどへのコネクションです。これは泣きつけばありとあらゆる状況をいとも簡単に打破してくれるものです。ただし、注意しなくてはならないのは決してあなたの実力でもないですし、相手だって何かの考えがあるということです。頼り続ければ、恩が積みあがったころに返してくれと言われるかもしれません。ただ、もし仮にあなたが住んでいる国に魔導国が攻めてきた場合、どんなあなたを作っても勝ち目はありませんが、このクラスのコネを持っていれば組織の方針を覆し、「お前の孫の代まで関与しないことを約束しよう」ぐらいの100年程度の平和は維持できそうです。"
        },
        A: {
            desc: "コネクション：世界トップクラス個人\nプレアデス全員に頼めるネイアのような立ち位置。",
            originalText: "コネクション：\n\nAのカードを使った人は世界トップクラスの実力者一人とのコネを保有します。\n相手が組織として動いている場合は無視されると思いますが、それを除けばSのカードを使ったコネクションに匹敵します。シズの1円シールを張られたネイアとかですね。プレアデス全員にお願い出来る形でありますし、デミウルゴスが殺すと判断しても「許してあげて」ぐらいは言ってくれます。ですが、上位者や組織の決定には逆らいません。"
        },
        B: {
            desc: "コネクション：数か国に顔が利く人物\n国王クラスやフールーダなど。",
            originalText: "コネクション：\n\nBのカードを使った人は数か国に顔が利く人物へのコネクション。\nこれは国王クラスのコネです。他国への移動が手軽だったり、その国内での手続きが非常にスムーズだったりします。場合によってはフールーダなどの実力者もそれにあたります。英雄でも逸脱者よりの個人などがそれです。はっきり言って、それらの人とのコネクションは暗殺や敵対の抑止にもなります。下手すれば国家レベルの暴力が敵に回る、と思えばよほどメリットがなければ怖くて敵対など出来ないですよね？"
        },
        C: {
            desc: "コネクション：国家に顔が利く人物\n大貴族やアダマンタイト級冒険者など。",
            originalText: "コネクション：\n\nCのカードを使った人は国家に顔が利く人物へのコネクション。\n上級階級、それも辺境伯、公爵などのコネです。場合によっては隣接している国に対しても使えるかもしれませんが、その効果は数段劣るものでしょう。アダマンタイト級冒険者とのコネもこのクラスでしょうか？"
        },
        D: {
            desc: "コネクション：ライバル\nいざという時は味方してくれるかも。",
            originalText: "コネクション：\n\nDのカードを使った人はライバルを持っています。\n基本的にはあなたの役に立つことはありませんが、本当にどうしようもなくなった時、きっと味方をしてくれることでしょう。ただ、命を張ってまでは決して助けてくれないと思います。"
        },
        E: {
            desc: "コネクション：敵がいる\n逸脱者や大国に命を狙われている。",
            originalText: "コネクション：\n\nEのカードを使った人は不幸にも敵がいます。\nそれは逸脱者よりの個人か、大国です。かなりの確率で命を狙われることになります。追手から逃げたり、すべきことが満足にできない、などのことから、あなたの生活レベルは一段階落ちるでしょう。\nもしくはあなたはその敵との謀略などを含んだ、争いにそれなりの時間を割く必要が出てくるかもしれません。"
        }
    }
};

const BOSS_DATA = {
    0: {
        short: "ラスボス：なし",
        original: "別に決めなくても構いませんよ？"
    },
    2: {
        short: "敵対者：アインズ＆ナザリック階層守護者の誰か＆高レベルのシモベ複数体",
        original: "2：アインズ＆ナザリック階層守護者の誰か＆高レベルのシモベ複数体"
    },
    3: {
        short: "敵対者：ナザリック階層守護者の誰か",
        original: "3：ナザリック階層守護者の誰か。サイコロで決めても良いですよ。\nサイコロを一つ振ってください。\n（1：シャルティア、2：コキュートス、3：マーレ、4：アウラ、5：デミウルゴス、6：アルベド）"
    },
    45: { // 4-5
        short: "敵対者：現地の人間種や亜人種の強者",
        original: "4～5：現地の人間種や亜人種の強者（サイコロ二つをもう一度振ってみてください。その出た目に45を加算します。それが敵のレベルです）。"
    },
    67: { // 6-7
        short: "敵対者：プレアデスの誰か（もしくは複数）",
        original: "6～7：プレアデスの誰か（もしくは複数）。丸山の想定する現地人のラスボスはプレアデスです。"
    },
    89: { // 8-9
        short: "敵対者：現地の異形種の強者",
        original: "8～9：現地の異形種の強者（サイコロ二つをもう一度振ってみてください。その出た目に50を加算します。それが敵のレベルです）。"
    },
    10: {
        short: "敵対者：白金の竜王の勢力",
        original: "10：白金の竜王の勢力（協力者や部下などであり、竜王本人は動きません。でも場合によっては……）"
    },
    11: {
        short: "敵対者：真なる竜王の一体",
        original: "11：真なる竜王の一体。白金の竜王の関係者かもしれませんし、それ以外かもしれません。"
    },
    12: {
        short: "敵対者：六竜の一体",
        original: "12：六竜の一体。"
    }
}

// Application State
const state = {
    selections: {
        limitLevel: null,
        origin: null,
        ability: null,
        item: null,
        talent: null,
        connection: null
    },
    locks: {
        limitLevel: false,
        origin: false,
        ability: false,
        item: false,
        talent: false,
        connection: false,
        boss: false
    },
    lastBossResult: null, // { total: number, text: string, dataKey: string/number }
    customOriginFactor: null, // To store the slider value
    characterImage: null, // Base64 string for character image
    freeText: {} // Initialize freeText
};

// DOM Elements
const elements = {
    cardStock: document.getElementById('card-stock'),
    selectors: {},
    locks: {},
    descriptionWrappers: {
        limitLevel: document.getElementById('desc-limitLevel'),
        origin: document.getElementById('desc-origin'),
        ability: document.getElementById('desc-ability'),
        item: document.getElementById('desc-item'),
        talent: document.getElementById('desc-talent'),
        connection: document.getElementById('desc-connection')
    },
    results: {
        baseLevel: document.getElementById('res-base-level'),
        bonusLevel: document.getElementById('res-bonus-level'),
        finalLevel: document.getElementById('res-final-level'),
        effectiveLevel: document.getElementById('res-effective-level')
    },
    bossBtn: document.getElementById('roll-boss-btn'),
    noBossBtn: document.getElementById('no-boss-btn'),
    bossResult: document.getElementById('boss-result'),
    resetBtn: document.getElementById('reset-btn'),
    saveBtn: document.getElementById('save-btn'),
    loadBtn: document.getElementById('load-btn'),
    loadFile: document.getElementById('load-file'),
    modal: document.getElementById('detail-modal'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body'),
    closeModal: document.querySelector('.close-modal'),

    // Image Elements
    charImgInput: document.getElementById('char-img-input'),
    charImgPreview: document.getElementById('char-img-preview'),
    charImgUploadBtn: document.getElementById('char-img-upload'),
    charImgClearBtn: document.getElementById('char-img-clear')
};

// Initialization
function init() {
    setupSelectors();
    setupBossLock();
    setupModal();
    setupImageUpload();

    // Bind buttons
    elements.resetBtn.addEventListener('click', resetAll);
    elements.bossBtn.addEventListener('click', rollBoss);
    elements.noBossBtn.addEventListener('click', setNoBoss);
    elements.saveBtn.addEventListener('click', saveData);
    elements.loadBtn.addEventListener('click', () => elements.loadFile.click());
    elements.loadFile.addEventListener('change', loadData);

    // Initial Render
    updateUI();
}

function setupSelectors() {
    const categories = ['limitLevel', 'origin', 'ability', 'item', 'talent', 'connection'];

    categories.forEach(key => {
        // Selectors
        const select = document.getElementById(`sel-${key}`);
        elements.selectors[key] = select;

        select.innerHTML = '<option value="">カードを選択...</option>';
        CARD_TYPES.forEach(card => {
            const option = document.createElement('option');
            option.value = card;
            option.textContent = `ランク ${card}`;
            select.appendChild(option);
        });

        select.addEventListener('change', (e) => {
            handleSelectionChange(key, e.target.value);
        });

        // Locks
        const lockBtn = document.querySelector(`.lock-btn[data-category="${key}"]`);
        elements.locks[key] = lockBtn;

        lockBtn.addEventListener('click', () => {
            toggleLock(key);
        });

        // List Buttons
        const listBtn = document.querySelector(`.list-btn[data-category="${key}"]`);
        if (listBtn) {
            listBtn.addEventListener('click', () => {
                showCategoryOverview(key);
            });
        }

        // Free Text
        const textarea = document.querySelector(`.category-block[data-category="${key}"] textarea`);
        if (textarea) {
            textarea.addEventListener('input', (e) => {
                state.freeText[key] = e.target.value;
            });
        }
    });
}

function setupBossLock() {
    const lockBtn = document.querySelector('.lock-btn[data-category="boss"]');
    if (lockBtn) {
        elements.locks['boss'] = lockBtn;
        lockBtn.addEventListener('click', () => {
            toggleLock('boss');
        });
    }

    const listBtn = document.querySelector('.list-btn[data-category="boss"]');
    if (listBtn) {
        listBtn.addEventListener('click', () => {
            showCategoryOverview('boss');
        });
    }
}

function showCategoryOverview(category) {
    const titleMap = {
        limitLevel: '限界レベル',
        origin: '出身',
        ability: '能力値',
        item: '特殊アイテム',
        talent: 'タレント',
        connection: 'コネクション',
        boss: 'ラスボス決定'
    };

    elements.modalTitle.textContent = `${titleMap[category] || category} - 一覧`;
    elements.modalBody.innerHTML = ''; // Clear content

    const listContainer = document.createElement('div');
    listContainer.className = 'overview-list';

    if (category === 'boss') {
        // Defined order for display
        const displayOrder = ['0', '2', '3', '45', '67', '89', '10', '11', '12'];

        displayOrder.forEach(key => {
            if (!BOSS_DATA[key]) return;

            const data = BOSS_DATA[key];
            const item = document.createElement('div');
            item.className = 'overview-item';

            let label = key;
            if (key === '0') label = "なし";
            else if (key === '45') label = "4～5";
            else if (key === '67') label = "6～7";
            else if (key === '89') label = "8～9";

            // Format output nicely
            item.innerHTML = `<strong>${label}</strong>: ${data.short}`;
            listContainer.appendChild(item);
        });
    } else {
        CARD_TYPES.forEach(rank => {
            const data = OVERLORD_DATA[category][rank];
            if (data) {
                const item = document.createElement('div');
                item.className = 'overview-item';

                // Add specific highlighting for S rank maybe?
                const shortDesc = data.desc.split('\n')[0]; // First line only for brevity

                item.innerHTML = `<strong>ランク ${rank}</strong>: ${shortDesc}`;

                // Add click listener to show full detail? Maybe too complex for now.
                // Let's just show the short desc.

                listContainer.appendChild(item);
            }
        });
    }

    elements.modalBody.appendChild(listContainer);
    elements.modal.classList.add('show');
}

function setupModal() {
    elements.closeModal.addEventListener('click', () => {
        elements.modal.classList.remove('show');
    });

    window.addEventListener('click', (event) => {
        if (event.target == elements.modal) {
            elements.modal.classList.remove('show');
        }
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && elements.modal.classList.contains('show')) {
            elements.modal.classList.remove('show');
        }
    });
}

function setupImageUpload() {
    elements.charImgUploadBtn.addEventListener('click', () => {
        elements.charImgInput.click();
    });

    elements.charImgInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            state.characterImage = event.target.result;
            updateImagePreview();
        };
        reader.readAsDataURL(file);

        // Reset input to allow same file selection
        e.target.value = '';
    });

    elements.charImgClearBtn.addEventListener('click', () => {
        state.characterImage = null;
        updateImagePreview();
    });
}

// Logic
function handleSelectionChange(category, value) {
    if (state.locks[category]) return;

    state.selections[category] = value || null;

    // Reset Custom Origin Factor if Origin changes
    if (category === 'origin') {
        state.customOriginFactor = null;
    }

    updateUI();
}

function toggleLock(category) {
    state.locks[category] = !state.locks[category];
    updateLockVisuals(category);
}

function updateLockVisuals(category) {
    const btn = elements.locks[category];
    const isLocked = state.locks[category];

    if (isLocked) {
        btn.classList.add('locked');
        btn.textContent = '🔒';

        if (category === 'boss') {
            elements.bossBtn.disabled = true;
            elements.bossBtn.style.opacity = '0.5';
            elements.bossBtn.style.cursor = 'not-allowed';
            elements.noBossBtn.disabled = true;
            elements.noBossBtn.style.opacity = '0.5';
            elements.noBossBtn.style.cursor = 'not-allowed';
        } else if (elements.selectors[category]) {
            elements.selectors[category].disabled = true;
        }
    } else {
        btn.classList.remove('locked');
        btn.textContent = '🔓';

        if (category === 'boss') {
            elements.bossBtn.disabled = false;
            elements.bossBtn.style.opacity = '1';
            elements.bossBtn.style.cursor = 'pointer';
            elements.noBossBtn.disabled = false;
            elements.noBossBtn.style.opacity = '1';
            elements.noBossBtn.style.cursor = 'pointer';
        } else if (elements.selectors[category]) {
            elements.selectors[category].disabled = false;
        }
    }
}

function setNoBoss() {
    if (state.locks.boss) return;

    state.lastBossResult = {
        total: 0,
        text: "ラスボス：なし",
        dataKey: 0
    };

    renderBossResult();
}

function resetAll() {
    Object.keys(state.selections).forEach(key => {
        if (!state.locks[key]) {
            state.selections[key] = null;
            elements.selectors[key].value = "";

            // Reset Free Text if not locked
            state.freeText[key] = "";
            const textarea = document.querySelector(`.category-block[data-category="${key}"] textarea`);
            if (textarea) textarea.value = "";
        }
    });
    // Boss result
    if (!state.locks.boss) {
        state.lastBossResult = null;
        elements.bossResult.innerHTML = "";
    }

    // Reset custom factor
    if (!state.locks.origin) {
        state.customOriginFactor = null;
    }

    // Image is NOT reset based on user request

    updateUI();
}

function updateUI() {
    Object.keys(elements.selectors).forEach(category => {
        if (state.selections[category]) {
            elements.selectors[category].value = state.selections[category];
        } else {
            elements.selectors[category].value = "";
        }

        // Update Free Text
        const textarea = document.querySelector(`.category-block[data-category="${category}"] textarea`);
        if (textarea) {
            textarea.value = state.freeText[category] || "";
        }

        updateLockVisuals(category);
    });

    updateLockVisuals('boss');

    updateCardAvailability();
    updateDescriptions();
    calculateStats();
    updateCardStockVisuals();
    renderBossResult();
    updateImagePreview();
}

function updateImagePreview() {
    if (state.characterImage) {
        elements.charImgPreview.src = state.characterImage;
        elements.charImgPreview.style.display = 'block';
        // Hide placeholder text logic can be handled by CSS if needed, or:
        const container = document.querySelector('.image-preview-container');
        const placeholder = container.querySelector('.image-placeholder');
        if (placeholder) placeholder.style.display = 'none';
    } else {
        elements.charImgPreview.src = "";
        elements.charImgPreview.style.display = 'none';
        const container = document.querySelector('.image-preview-container');
        const placeholder = container.querySelector('.image-placeholder');
        if (placeholder) placeholder.style.display = 'block';
    }
}

function getUsedCards() {
    return Object.values(state.selections).filter(v => v !== null);
}

function updateCardAvailability() {
    const usedCards = getUsedCards();

    Object.keys(elements.selectors).forEach(category => {
        if (state.locks[category]) return;

        const currentSelection = state.selections[category];
        const selector = elements.selectors[category];

        Array.from(selector.options).forEach(option => {
            if (option.value === "") return;

            if (usedCards.includes(option.value) && option.value !== currentSelection) {
                option.disabled = true;
                option.text = `ランク ${option.value} (使用済)`;
            } else {
                option.disabled = false;
                option.text = `ランク ${option.value}`;
            }
        });
    });
}

function updateCardStockVisuals() {
    const usedCards = getUsedCards();
    elements.cardStock.innerHTML = '';

    CARD_TYPES.forEach(card => {
        const badge = document.createElement('div');
        const isUsed = usedCards.includes(card);
        badge.className = `card-badge ${isUsed ? 'used' : ''}`;
        badge.textContent = card;

        badge.addEventListener('click', () => {
            if (isUsed) {
                const category = Object.keys(state.selections).find(key => state.selections[key] === card);
                if (category) {
                    if (state.locks[category]) {
                        alert('このカードはロックされている項目で使用中です。解除するにはロックを外してください。');
                    } else {
                        handleSelectionChange(category, null);
                        elements.selectors[category].value = "";
                    }
                }
            }
        });

        elements.cardStock.appendChild(badge);
    });
}

function updateDescriptions() {
    Object.keys(elements.descriptionWrappers).forEach(category => {
        const rank = state.selections[category];
        const container = elements.descriptionWrappers[category];

        container.innerHTML = '';
        container.className = 'description-container';

        if (rank && OVERLORD_DATA[category][rank]) {
            const data = OVERLORD_DATA[category][rank];

            // Description Text
            const descDiv = document.createElement('div');
            descDiv.className = 'description-area';
            descDiv.textContent = data.desc;
            container.appendChild(descDiv);

            // Logic for Origin Slider if applicable
            if (category === 'origin' && typeof data.minBonus !== 'undefined') {
                const sliderContainer = document.createElement('div');
                sliderContainer.style.padding = '5px';
                sliderContainer.style.background = 'rgba(0,0,0,0.3)';
                sliderContainer.style.marginTop = '4px';

                // Ensure value is set
                const currentVal = state.customOriginFactor !== null ? state.customOriginFactor : data.bonusFactor;

                const label = document.createElement('label');
                label.style.fontSize = '0.8rem';
                label.style.display = 'block';
                label.innerHTML = `ボーナス倍率調整: <span id="origin-val-display" style="font-weight:bold; ${currentVal < data.bonusFactor ? 'color:#d4af37;' : ''}">${currentVal.toFixed(2)}</span>`;

                const slider = document.createElement('input');
                slider.type = 'range';
                slider.min = data.minBonus;
                slider.max = data.bonusFactor;
                slider.step = 0.01;
                slider.value = currentVal;
                slider.style.width = '100%';

                slider.addEventListener('input', (e) => {
                    const newVal = parseFloat(e.target.value);
                    state.customOriginFactor = newVal;

                    const display = sliderContainer.querySelector('#origin-val-display');
                    display.textContent = newVal.toFixed(2);
                    if (newVal < data.bonusFactor) {
                        display.style.color = '#d4af37';
                        display.textContent += " (調整済)";
                    } else {
                        display.style.color = '';
                    }

                    calculateStats(); // Recalculate immediately
                });

                sliderContainer.appendChild(label);
                sliderContainer.appendChild(slider);
                container.appendChild(sliderContainer);
            }

            // Detail Button (Renamed)
            const detailBtn = document.createElement('button');
            detailBtn.className = 'detail-btn';
            detailBtn.textContent = '詳細（原文）';
            detailBtn.addEventListener('click', () => {
                showModal(category, rank, data);
            });
            container.appendChild(detailBtn);

            container.style.display = 'flex';
        } else {
            container.style.display = 'none';
        }
    });
}

function showModal(categoryOrTitle, rankOrSubtitle, data) {
    const titleMap = {
        limitLevel: '限界レベル',
        origin: '出身',
        ability: '能力値',
        item: '特殊アイテム',
        talent: 'タレント',
        connection: 'コネクション',
        boss: 'ラスボス決定'
    };

    const title = titleMap[categoryOrTitle] || categoryOrTitle;
    let subtitle = `ランク ${rankOrSubtitle}`;
    if (categoryOrTitle === 'boss') {
        subtitle = rankOrSubtitle;
    }

    elements.modalTitle.textContent = `${title} - ${subtitle} の詳細`;
    elements.modalBody.textContent = data.originalText || data.original || "詳細情報はありません。";
    elements.modal.classList.add('show');
}

function calculateStats() {
    const limitRank = state.selections.limitLevel;
    const originRank = state.selections.origin;
    const abilityRank = state.selections.ability;
    const itemRank = state.selections.item;

    if (!limitRank) {
        elements.results.baseLevel.textContent = "-";
        elements.results.bonusLevel.textContent = "-";
        elements.results.finalLevel.textContent = "-";
        elements.results.effectiveLevel.textContent = "-";
        return;
    }

    const baseLevel = OVERLORD_DATA.limitLevel[limitRank].level;
    let bonus = 0;

    if (originRank) {
        const originData = OVERLORD_DATA.origin[originRank];

        let factor = originData.bonusFactor;
        if (state.customOriginFactor !== null) {
            factor = state.customOriginFactor;
        }

        bonus = (baseLevel - 20) * factor;
    }

    // Check if result is negative (shouldn't be, but good to be safe with math)
    if (bonus < 0) bonus = 0;

    bonus = Math.round(bonus * 10) / 10;
    const finalLevel = baseLevel + bonus;

    let totalAdjustment = 0;
    if (abilityRank) totalAdjustment += OVERLORD_DATA.ability[abilityRank].adjustment;
    if (itemRank) totalAdjustment += OVERLORD_DATA.item[itemRank].adjustment;

    const effectiveLevel = finalLevel * (1 + totalAdjustment);

    elements.results.baseLevel.textContent = baseLevel;
    elements.results.bonusLevel.textContent = `+${bonus}`;
    elements.results.finalLevel.textContent = Math.round(finalLevel * 10) / 10;
    elements.results.effectiveLevel.textContent = Math.round(effectiveLevel * 10) / 10;
}

// Dice Roll Logic
function rollBoss() {
    if (state.locks.boss) return;

    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const total = d1 + d2;

    let resultText = `出目: ${d1} + ${d2} = ${total}\n\n`;
    let bossData = null;
    let bossKey = total;

    if (total === 2) {
        bossData = BOSS_DATA[2];
        resultText += bossData.short;
    } else if (total === 3) {
        bossData = BOSS_DATA[3];
        resultText += bossData.short + "\n";
        const subRoll = Math.floor(Math.random() * 6) + 1;
        resultText += `守護者決定ダイス: ${subRoll} -> `;
        switch (subRoll) {
            case 1: resultText += "シャルティア"; break;
            case 2: resultText += "コキュートス"; break;
            case 3: resultText += "マーレ"; break;
            case 4: resultText += "アウラ"; break;
            case 5: resultText += "デミウルゴス"; break;
            case 6: resultText += "アルベド"; break;
        }
    } else if (total >= 4 && total <= 5) {
        bossKey = 45;
        bossData = BOSS_DATA[45];
        const subD1 = Math.floor(Math.random() * 6) + 1;
        const subD2 = Math.floor(Math.random() * 6) + 1;
        const subTotal = subD1 + subD2;
        const level = subTotal + 45;
        resultText += `\n再ロール: ${subD1} + ${subD2} = ${subTotal} (+45) -> Lv.${level}\n`;
        resultText += `${bossData.short} (Lv.${level})`;
    } else if (total >= 6 && total <= 7) {
        bossKey = 67;
        bossData = BOSS_DATA[67];
        resultText += bossData.short;
    } else if (total >= 8 && total <= 9) {
        bossKey = 89;
        bossData = BOSS_DATA[89];
        const subD1 = Math.floor(Math.random() * 6) + 1;
        const subD2 = Math.floor(Math.random() * 6) + 1;
        const subTotal = subD1 + subD2;
        const level = subTotal + 50;
        resultText += `\n再ロール: ${subD1} + ${subD2} = ${subTotal} (+50) -> Lv.${level}\n`;
        resultText += `${bossData.short} (Lv.${level})`;
    } else if (total === 10) {
        bossKey = 10;
        bossData = BOSS_DATA[10];
        resultText += bossData.short;
    } else if (total === 11) {
        bossKey = 11;
        bossData = BOSS_DATA[11];
        resultText += bossData.short;
    } else if (total === 12) {
        bossKey = 12;
        bossData = BOSS_DATA[12];
        resultText += bossData.short;
    }

    state.lastBossResult = {
        total: total,
        text: resultText,
        dataKey: bossKey
    };

    renderBossResult();

    // Animation effect
    elements.bossResult.style.backgroundColor = "#300";
    setTimeout(() => {
        elements.bossResult.style.backgroundColor = "#000";
    }, 200);
}

function renderBossResult() {
    elements.bossResult.innerHTML = '';

    if (!state.lastBossResult) return;

    const { total, text, dataKey } = state.lastBossResult;
    const bossData = BOSS_DATA[dataKey];

    const textDiv = document.createElement('div');
    textDiv.className = 'boss-text-content';
    textDiv.textContent = text;
    elements.bossResult.appendChild(textDiv);

    if (bossData) {
        const btn = document.createElement('button');
        btn.className = 'boss-detail-btn';
        btn.textContent = '詳細（原文）';
        btn.addEventListener('click', () => {
            showModal('boss', `出目 ${total}`, bossData);
        });
        elements.bossResult.appendChild(btn);
    }
}

// Save & Load Functionality
function saveData() {
    const data = {
        version: "1.2",
        timestamp: new Date().toISOString(),
        state: state
    };

    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `overlord_alter_ego_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function loadData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data && data.state) {
                // Restore State
                state.selections = data.state.selections || {};
                state.locks = data.state.locks || {};

                // Ensure boss lock exists if loading old data
                if (typeof state.locks.boss === 'undefined') state.locks.boss = false;

                state.lastBossResult = data.state.lastBossResult || null;
                state.customOriginFactor = (typeof data.state.customOriginFactor !== 'undefined') ? data.state.customOriginFactor : null;
                state.characterImage = data.state.characterImage || null;
                state.freeText = data.state.freeText || {}; // Restore freeText

                updateUI();
                alert("データを読み込みました。");
            } else {
                throw new Error("Invalid data format");
            }
        } catch (err) {
            console.error(err);
            alert("ファイルの読み込みに失敗しました。データが破損しているか、形式が異なります。");
        }
    };
    reader.readAsText(file);

    // Reset file input so same file can be loaded again if needed
    event.target.value = '';
}

// Run
window.addEventListener('DOMContentLoaded', init);
