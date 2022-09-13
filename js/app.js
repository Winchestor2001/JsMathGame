let start_game_btn = document.getElementById('start_game');
let start_question = document.getElementById('start_question');
let question_math = document.querySelector('.question');
let timedown = document.getElementById('timedown');
let user_correct = document.getElementById('user_score_yes');
let user_incorrect = document.getElementById('user_score_no');
let over_correct = document.getElementById('over_correct');
let over_incorrect = document.getElementById('over_incorrect');
let g_card = document.getElementsByClassName('g_card')
let g_card2 = document.querySelectorAll('.g_card')
let modal_window = document.querySelector('.modal_window')

const startingMinutes = 1;
let time = startingMinutes * 60
let correct_answer = 0
let now_score_yes = 0
let now_score_no = 0
let correct_score_time = 30
let incorrect_score_time = 10

let interval;


function start_game(){
    start_game_btn.classList.add('d-none');
    start_question.classList.remove('d-none');
    generatedQuestion();
    interval = setInterval(updateTimer, 1000);
};

function generatedQuestion(){
    let simboles = '+-*/'

    let i=0;
    while (i <= 2){
        let num1 = Math.floor(Math.random() * 100);
        let num2 = Math.floor(Math.random() * 100);
        if (num1 >= num2 && num1 != 0){
            let simbole = simboles.charAt(Math.floor(Math.random() * simboles.length))
            question_math.innerHTML = `${num1} ${simbole} ${num2} = ?`
            if (eval(`${num1} ${simbole} ${num2}`) <= 0){
                return generatedQuestion();
            }
            variants(eval(`${num1} ${simbole} ${num2}`))
            break
        }
        continue
    }
}

function variants(answer){
    let num1 = Math.floor(Math.random() * answer);
    let num2 = Math.floor(Math.random() * answer);
    let num3 = Math.floor(Math.random() * answer);
    let variant_nums = [num1, num2, num3, answer]
    correct_answer = answer
    shuffleArray(variant_nums);
    for (let i=0; i < g_card.length; i++){
        g_card[i].innerHTML = Math.round(variant_nums[i])
    }
}


function updateTimer(){
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (minutes <= -1 && seconds <= -1){
        modal_window.classList.remove('d-none')
        start_question.classList.add('d-none')
        over_correct.innerHTML = now_score_yes
        over_incorrect.innerHTML = now_score_no
        clearInterval(interval);
        return
    }
    if (minutes <= 9){
        timedown.innerHTML = `0${minutes}:${seconds}`;
    }
    if (seconds <= 9){
        timedown.innerHTML = `${minutes}:0${seconds}`;
    }
    if (minutes <= 9 && seconds <= 9){
        timedown.innerHTML = `0${minutes}:0${seconds}`;
    }
    if (minutes > 9 && seconds > 9){
        timedown.innerHTML = `${minutes}:${seconds}`;
    }
    // timedown.innerHTML = `${minutes}:${seconds}`;
    time--;
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


g_card2.forEach(card => {
    card.addEventListener('click', () => {
        if (Number(card.innerHTML) == correct_answer){
            card.style.background = '#04AA6D'
            setTimeout(() => {
                card.style.background = '#0D6EFD'
                now_score_yes += 1;
                user_correct.innerHTML = now_score_yes
                time += correct_score_time
                generatedQuestion();
            }, 500);
        }
        else{
            card.style.background = '#FF0000'
            setTimeout(() => {
                card.style.background = '#0D6EFD'
                now_score_no += 1 
                user_incorrect.innerHTML = now_score_no
                time -= incorrect_score_time
                generatedQuestion();
            }, 500);
        }
    })
}) 
