from django.shortcuts import render
from django.shortcuts import render, redirect,get_object_or_404
from django.http import JsonResponse
#from routines.models import LetterRoutine, SpecialDateRoutine 
#from emotions.utils import analyze_emotion_for_letter
from .models import Letters
from .forms import LetterForm
from django.utils.timezone import now  # 현재 날짜 가져오기
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime, timedelta
import openai
import os
openai.api_key = os.getenv("OPENAI_API_KEY")

# 개발용 가짜 유저 주입
from django.contrib.auth.models import User
fake_user = User.objects.first()
letters = Letters.objects.filter(user=fake_user)
#

def home(request):
    return render(request, 'myapp/index.html')

# 1️⃣ 편지 작성 뷰
# @login_required(login_url='/auth/login/')  # 👈 직접 로그인 URL 지정 (auth 마이크로서비스)

def write_letter(request):
    # 개발용 가짜 유저 지정
    fake_user = User.objects.first()
    if not fake_user:
        return JsonResponse({"error:" "테스트 유저 없음"})

    if request.method == 'POST':
        form = LetterForm(request.POST, request.FILES)
        if form.is_valid():
            letter = form.save(commit=False)  # ✅ 데이터 저장 전에 추가 설정
            letter.user = fake_user # 원래는 request.user  # 🔥 작성자를 현재 로그인한 사용자로 설정
            letter.category = 'future' # 기본적으로 미래 카테고리로 분류
            letter.save()
           # analyze_emotion_for_letter(letter) # 추후 구현
            return redirect('letters:letter_list')  # 편지 목록 페이지로 이동
    else:
        form = LetterForm()
        
    return render(request, 'letters/writing.html', {'form': form})


# 2️⃣ 작성된 편지 목록 보기
# @login_required(login_url='/auth/login/') # 로그인 안 된 경우 이 URL로 리디렉션
def letter_list(request):
    # 개발용 가짜 유저 지정
    fake_user = User.objects.first()
    if not fake_user:
        return JsonResponse({"error": "테스트용 유저가 없습니다."})

    letters = Letters.objects.filter(user=fake_user)   # 원래는 (user=request.user) 


    today = datetime.now().date()
    
    for letter in letters:
        if letter.open_date == today:
            letter.category = 'today'
        elif letter.open_date > today:
            letter.category = 'future'
        else:
            letter.category = 'past'
        letter.save()  # ✅ DB에 저장!


    return render(request, 'letters/letter_list.html', {
        'letters': letters,
    })


#개별 편지 상세보기api
# @login_required(login_url='/auth/login/')
def letter_json(request, letter_id):
    letter = get_object_or_404(Letters, id=letter_id)
    data = {
        'id':letter.id,
        'title': letter.title,
        'content': letter.content,
        'letter_date': letter.open_date.strftime("%Y-%m-%d"), #개봉 가능 날짜
    }
    return JsonResponse(data)
