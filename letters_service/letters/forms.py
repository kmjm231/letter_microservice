from django import forms
from .models import Letters


class LetterForm(forms.ModelForm):
    class Meta:
        model = Letters
        fields = ['title','content', 'image','open_date']  # 사용자 입력 필드

        widgets = {
            'content': forms.Textarea(attrs={'class':'form-control', 'style':'width: 350px; height:440px'}),
            'open_date': forms.DateInput(attrs={'type': 'date'}),  # 날짜 입력 필드
            
        }