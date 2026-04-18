document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const backBtn = document.getElementById('back-btn');
    const toc = document.getElementById('toc');
    const tocLinks = document.querySelectorAll('.toc a');
    const fadeElements = document.querySelectorAll('.fade-in-left');
    const bgVideo = document.getElementById('bg-video');

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


    // メニューボタンをクリックした時の処理
    menuBtn.addEventListener('click', function() {
        // 目次パネルに 'active' クラスを付け外しする（表示・非表示の切り替え）
        toc.classList.toggle('active');
    });

    //　目次の中のリンクをクリックした時の処理
    tocLinks.forEach(link => {
        link.addEventListener('click', function() {
            // リンク先に飛ぶと同時に、目次パネルを閉じる（'active' クラスを外す）
            toc.classList.remove('active');
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

/*
        // まず画像に「透明になるクラス」をつける
        mainPoster.classList.add('fade-out-poster');
        
        // 0.5秒（500ミリ秒）待ってから、中身の処理を実行する
        setTimeout(function() {
            // 新しい画像の読み込みが完了したら透明を解除する予約
            mainPoster.onload = function() {
                // 新しい画像が現れる
                mainPoster.classList.remove('fade-out-poster');
                
                // リセット
                mainPoster.onload = null; 
            };
            // 画像のパスを新しいものに書き換える
            mainPoster.src = imagePath;
            
            // 「透明になるクラス」を外す
            mainPoster.classList.remove('fade-out-poster');
            
        }, 800); // 500ms待ち CSSの0.5sより　*/

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
