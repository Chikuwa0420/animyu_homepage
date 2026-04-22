document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const backBtn = document.getElementById('back-btn');
    const toc = document.getElementById('toc');
    const tocLinks = document.querySelectorAll('.toc a');
    const fadeElements = document.querySelectorAll('.fade-in-left, .fade-in-right');
    const bgVideo = document.getElementById('bg-video');
    const nameButtons = document.querySelectorAll('.performer-name');
    const guestBoxes = document.querySelectorAll('.guest-box');
    const sectionTitles = document.querySelectorAll('.section-title');


    //バナーの動画再生周期
    if (bgVideo) {
    // 動画の再生が最後まで終わった時のイベント
    bgVideo.addEventListener('ended', function() {
        
        // setTimeoutを使って指定した時間（ミリ秒）だけ待つ
        setTimeout(function() {
            bgVideo.play(); // 再び再生する
        }, 2000); 
        
    });
}

// アイコンの状態を更新する共通の関数
    function updateMenuIcon() {
        const menuImg = menuBtn.querySelector('img');
        if (toc.classList.contains('active')) {
            menuImg.src = 'image/btn/menu-icon-batsu.png';
        } else {
            menuImg.src = 'image/btn/menu-icon.png';
        }
        // 連続でクリックしても動くように、一度クラスを外す
            menuImg.classList.remove('change-menu-btn');
            // ブラウザの描画をリセット
            void menuImg.offsetWidth;
            // アニメーション用のクラスを付与する
            menuImg.classList.add('change-menu-btn');
    }
    // メニューボタンをクリックした時の処理
    menuBtn.addEventListener('click', function() {
        // 目次パネルに 'active' クラスを付け外しする（表示・非表示の切り替え）
        toc.classList.toggle('active');
        updateMenuIcon();// iconを更新する関数を呼び出す
    });

    //　目次の中のリンクをクリックした時の処理
    tocLinks.forEach(link => {
        link.addEventListener('click', function() {
            // リンク先に飛ぶと同時に、目次パネルを閉じる（'active' クラスを外す）
            toc.classList.remove('active');
            updateMenuIcon(); // iconを更新する関数を呼び出す
        });
    });

    //　戻るボタンをクリックしたときの処理
    backBtn.addEventListener('click', function(e) {
        // もし戻るボタンが <a> タグだった場合、デフォルトのページ遷移を防ぐ
        e.preventDefault(); 
        
        // ページのトップ（一番上）へスムーズにスクロールする
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    //スクロール時のフェードインアニメーション処理
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // 要素が画面内に入ったか判定
            if (entry.isIntersecting) {
                // 画面に入ったら 'is-visible' クラスを付与
                entry.target.classList.add('is-visible');
                
                // 1回アニメーションしたら、その要素の監視を終了する
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.2 // 要素が20%見えたら発火
    });

    // 取得した各要素を監視役に登録
    fadeElements.forEach(element => {
        observer.observe(element);
    });

// ===  演者紹介のタブ切り替え処理 ===
    nameButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 一旦すべての名前ボタンから 'is-active' クラスを外す
            nameButtons.forEach(btn => btn.classList.remove('is-active'));
            // クリックされた名前ボタンに 'is-active' クラスを付ける
            button.classList.add('is-active');

            // クリックされたボタンの data-target の値（id名）を取得
            const targetId = button.getAttribute('data-target');

            // 一旦すべての詳細ボックスから 'is-active' クラスを外す（非表示にする）
            guestBoxes.forEach(box => box.classList.remove('is-active'));
            // ターゲットとなる詳細ボックスに 'is-active' クラスを付ける（表示する）
            document.getElementById(targetId).classList.add('is-active');
        });
    });

// ===  セクションタイトルのフェードインアニメーション ===
sectionTitles.forEach(title => {
    // 元のテキストを取得して、前後の余白を消す
    const text = title.textContent.trim();
    // 中身を一旦空にする
    title.textContent = '';

    // テキストを一文字ずつ分割してspanタグで囲む
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        // 空白文字の場合はレイアウト崩れを防ぐために特殊文字を入れる
        span.textContent = char === ' ' ? '\u00A0' : char; 
        
        // CSS変数 '--i' に何文字目か（0, 1, 2...）の番号をセット
        span.style.setProperty('--i', index);
        
        // 生成したspanをh2の中に戻す
        title.appendChild(span);
    });
});
// === あにみゅ子ちゃん画像の傾き処理 ===
    const animyukoImg = document.querySelector('img[alt="あにみゅ子ちゃんの写真"]');
    if (animyukoImg) {
        animyukoImg.addEventListener('click', function() {
            // 連続でクリックしても動くように、一度クラスを外す
            this.classList.remove('tilt-active');
            // ブラウザの描画をリセット
            void this.offsetWidth;
            // アニメーション用のクラスを付与する
            this.classList.add('tilt-active');
        });
    }
});


 //画像切り替えボタンの処理
// ポスター画像を変更する関数
// imagePathは、ボタン側で指定した新しい画像のパス

function changePoster(imagePath) {
    const frontImage = document.getElementById('poster-front');
    const backImage = document.getElementById('poster-back');
    
    if (frontImage && backImage) {

        //裏の画像を新しい物にする
        backImage.src = imagePath;

        // 新しい裏画像の読み込みが完了したらアニメーション開始
        backImage.onload = function() {
            // ② 表の画像をゆっくり透明にする（ここで2枚が重なって透けて見えます！）
            frontImage.classList.add('fade-out-poster');
            
            // ③ 表側が完全に透明になったら（0.8秒＝800ミリ秒後）
            setTimeout(function() {
                // こっそり表側も新しい画像に入れ替える
                frontImage.src = imagePath;
                // 透明を解除して、元の状態（表側が見えている状態）に戻す
                frontImage.classList.remove('fade-out-poster');
            }, 1800); // CSSの transition（1.5s）と同じ時間に合わせます
            
            // 次の切り替えでおかしくならないようリセット
            backImage.onload = null;
        };

    }
}
