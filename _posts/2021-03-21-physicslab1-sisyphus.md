---
title: "물리학실험1 시지프스의 고민"
date: 2021-03-21 04:01:19
categories:
 - Study
 - PhysicsLab
 - PhysicsLab1
tags:
 - 물리학실험
 - 물리학실험1
 - 보고서


---

# Prelab

## 에너지 보존 법칙

### 1. 실험 목적

​	실에 매달려 좌우로 진동하는 시계추와 가속 도중 원형 궤도에 진입하는 롤러코스터는 서로 완전하게 다른 운동을 하는 것처럼 보인다. 그러나 이들을 에너지 측면에서 바라본다면, 운동 에너지와 위치 에너지 간의 변화가 일어난다는 공통점이 있다. 이렇듯 에너지는 소멸하지 않고 그 형태만 바꾼다는 법칙을 에너지 보존 법칙이라고 하며, 롤러코스터와 비슷한 궤도 위의 공의 운동을 관찰함으로써 이를 실험적으로 검증하고자 한다.

### 2. 배경 지식

#### 2-1. 에너지 보존 법칙

​	에너지 보존 법칙은, 고립계 내부의 에너지의 총합은 항상 일정하며, 에너지는 형태를 바꾸거나 다른 계로 전달될 수 있지만 자체적으로 소멸되지는 않는다는 물리학 법칙이다. 열역학에서 이 법칙은 열역학 제1법칙으로 불리며, 단열 과정에 있어 계 간의 에너지 이동은 계가 한 일과 계에 한 일의 합임을 설명한다.

​	에너지 보존 법칙의 따름정리로, 역학적 에너지 보존 법칙이 있다. 마찰이나 저항, 운동으로 인한 열 및 소리 발생 등이 없는 이상적인 가정 아래, 운동하는 물체의 역학적 에너지는 보존된다는 법칙이다. 여기서 역학적 에너지는 위치 에너지와 운동 에너지의 합이다. 에너지의 형태 변화는 위치 에너지와 운동 에너지 간의 변화밖에 없기 때문에, 이 법칙은 에너지 보존 법칙에 의하여 성립한다.

​	한편, 에너지 보존 법칙은 열역학 제2법칙과 함께 쓰여, 무한동력 영구기관이 존재할 수 없음을 보여준다. 외부의 어떠한 공급을 받지 않고 에너지를 생산하는 영구기관은 에너지 보존 법칙에 위배된다. 또한, 열역학 제2법칙에 의하면 엔트로피는 감소할 수 없기 때문에, 열 에너지는 역학적 에너지로 자발적으로 변화하지 않는다. 따라서, 물을 얼음과 수증기로 변환하는 영구기관 또한 존재할 수 없다.

#### 2-2. 미끄러짐 없는 구름 운동

​	미끄러짐 없는 구름 운동이란, 물체가 미끄러짐이 없이, 병진 운동과 동시에 회전 운동을 하는 것을 의미한다.

​	밀도가 균일한, 반지름 $r$, 질량 $m$인 구체가 미끄러짐 없이 구름 운동을 한다고 가정하자. 구체의 위치 에너지는

$$ U = mgh $$

, 운동 에너지는

$$ K = K _\text{trans} + K _\text{rot} = \frac{1}{2} mv^2 + \frac{1}{2} I \omega^2 $$

다. 미끄러짐이 없으므로 $v=r \omega$고, 구체의 관성 모멘트는 $\displaystyle I = \frac{2}{5} mr^2$이므로, 역학적 에너지는

$$ E = U + K = mgh + \frac{7}{10} m v^2 $$

다.

​	동일한 구체가 폭이 일정한 궤도 위에서 동일한 운동을 한다고 가정하자. 궤도에 구체가 닿는 두 지점 사이의 거리를 $d$라고 한다면, 이 구체는 유효 반지름 $\displaystyle r _\text{eff} = \sqrt{ r^2 - \frac{d^2}{4} }$을 가진다. 위와 다르게, $r _\text{eff}<r$이고 $v=r _\text{eff} \omega$이므로, 구체의 역학적 에너지를 다시 계산하면

$$ E=mgh+\frac{1}{2}mv^2+\frac{1}{2} \left( \frac{2}{5}mr^2 \right) \left( \frac{v}{r _\text{eff}} \right)^2 = mgh+ \left( \frac{1}{2} + \frac{1}{5} \left( \frac{r}{r _\text{eff}} \right)^2 \right) mv^2 $$

가 된다.

#### 2-3. 실험 장치에서 구슬의 운동

​	2-2절의 내용을 확장하여, 의 기울기를 가지는 비탈 궤도 위의 구체의 운동을 생각해보자. $\displaystyle c _\text{eff}=\frac{1}{2}+\frac{1}{5} \left( \frac{r}{r _\text{eff}} \right)^2$로 치환하면, 구체는 항상 $mgh+c _\text{eff}mv^2$의 값을 일정하게 유지한다. 정지된 구체가 비탈 궤도를 따라 수직 방향으로 $\Delta h$만큼 이동하였다면, 역학적 에너지 보존 법칙에 의하여

$$ v = \sqrt{ \frac{ g \Delta h }{ c _\text{eff} } } $$

다. 이동 거리에 관한 식에 의하여

$$ \int _0 ^{ t \left( \Delta h \right) } v \mathrm{d} t = \frac{ \Delta h }{ \sin \theta } $$

이므로, 이를 미분하여

$$ v \sin \theta \mathrm{d} t = \mathrm{d} \left( \Delta h \right) $$

를 얻는다. 위에서 구한 $v$와 $\Delta h$ 간의 관계식을 대입하면,

$$ \frac{ \mathrm{d} \left( \Delta h \right) }{ \sqrt{ \Delta h } } = \sqrt{ \frac{ g }{ c _\text{eff} } } \sin \theta \mathrm{d} t $$

를 얻고, 이를 적분하여

$$ 2 \sqrt{ \Delta h } = \left( \sqrt{ \frac{ g }{ c _\text{eff} } } \sin \theta \right) t $$

임을 알 수 있다. 결과적으로

$$ \Delta h = \frac{ g \left( \sin \theta \right)^2 }{ 4 c _\text{eff} } t^2 $$

라는 $t$와 $\Delta h$간의 관계를 얻어낼 수 있다.

​	비탈 궤도를 따라 가속한 구체가 원형 궤도에 진입하는 상황을 생각하자. 반지름 $r _\text{cir}$의 원형 궤도의 최고점까지 구체가 도달하기 위하여, 구체는 최고점에서 중력 이상의 구심력을 가져야 한다. 고로, 최고점까지 구체가 도달하기 위하여 필요한 최소 수직 방향 이동 거리를 $\Delta h _\text{min}$라 하면, 최고점에서 구심력과 중력이 같으므로

$$ \frac{ m v^2 }{ r _\text{cir} } = mg $$

다. 역학적 에너지 보존 법칙에 의하여

$$ mg \Delta h = mg \left( 2 r _\text{cir} \right) + c _\text{eff} m v^2 $$

이므로, 이를 $\Delta h _\text{min}$에 대하여 정리하면

$$ \Delta h _\text{min} = \left( 2 + c _\text{eff} \right) r _\text{cir} = \left( \frac{5}{2} + \frac{1}{5} \left( \frac{ r }{ r _\text{eff} } \right)^2 \right) r _\text{cir} $$

임을 알 수 있다.

### 3. 실험 방법

​	일정한 기울기를 가지는 직선 궤도와, 적당한 반지름의 원형 궤도를 이어, 구슬의 이동 궤도를 제작한다. ①직선 궤도에서 구슬의 운동을 관찰하는 실험과 ②두 궤도를 모두 이용하여 $\Delta h _\text{min}$를 계산하는 실험을 진행한다.

#### 3-1. 물리량 측정

​	버니어 캘리퍼스와 전자 저울을 이용하여 구슬의 반지름과 질량을 측정한다. 직선 궤도의 기울기와 원형 궤도의 반지름, 궤도의 폭을 측정한다.

​	이러한 측정 과정을 여러 번 반복하여, 평균값을 사용함으로써 측정에 의한 오차를 줄인다.

#### 3-2. 실험 ① 역학적 에너지 보존 실험

​	직선 궤도의 두 지점 $Z_1$, $Z_2$를 설정하고, 두 지점 사이의 거리를 자로 측정한다. $Z_1$은 구슬의 운동이 시작되는 지점, $Z_2$는 운동 종료 지점을 의미한다.

​	궤도를 수직하게 찍도록 카메라의 위치를 설정하고, 구슬을 $Z_1$에 정지된 상태로 놓아 $Z_2$까지 굴러 내려가는 모습을 기준자와 함께 카메라로 녹화한다. 녹화 영상을 I-CA 프로그램을 이용하여, 구슬의 운동을 분석한다. 시간에 따른 추의 $y$좌표를 분석하고, 이 데이터를 바탕으로 $Z_1$과 $Z_2$에서의 역학적 에너지, 시간에 따른 운동 에너지와 위치 에너지를 계산한다. 궤도를 따라 구르는 추가 역학적 에너지 보존 법칙을 따르는 지 확인한다.

​	동일한 $Z_1$, $Z_2$ 지점에 대하여 위의 과정을 여러 번 반복한다. 또한, 지점 $Z_1$, $Z_2$의 위치를 다양하게 설정하여 본 과정을 여러 번 반복한다.

#### 3-3. 추가실험 ① 역학적 에너지 보존 실험

​	3-2절의 실험 ① 과정을 다양한 질량의 구슬에 대하여 동일하게 수행한다. 역학적 에너지 보존 법칙은 구슬의 질량에 관계없이 성립함을 확인한다.

​	구슬 테두리 한 곳에 조그마한 표식을 하여, 실험 ① 과정을 수행하되, 구슬의 회전각과 각가속도를 같이 분석한다. 각가속도의 변화를 통하여, 궤도로 인한 마찰력의 영향을 알아본다.

#### 3-4. 실험 ② $\Delta h _\text{min}$ 측정

​	직선 궤도와 원형 궤도를 연결한다. 직선 궤도 위의 다양한 지점에서 정지 상태의 구슬을 놓아, 구슬이 원형 궤도의 최고점을 도달하는지 여부를 확인한다. 원형 궤도의 최고점을 도달할 수 있는 가장 낮은 지점 $Z_0$를 찾고, 지점 $Z_0$과 원형 궤도 시작 지점 간의 거리를 자로 측정한다.

​	이론적인 최소 높이 $\Delta h _\text{min}$과 실험으로부터 얻은 값을 비교함으로써 마찰력의 효과를 확인한다.

### 4. 실험 장비

​	3절에 서술한 두 종류의 실험을 진행하기 위해서는 다음과 같은 장비가 필요하다. 카메라 및 I-CA 프로그램이 설치된 컴퓨터 1대, 다양한 질량의 플라스틱 구슬, 1m 플라스틱 자 한 개, 직선 궤도와 원형 궤도, 스탠드, 버니어 캘리퍼스, 전자 저울이 필요하다.

​	구슬의 운동이 너무 빠르게 진행되어, 구슬이 궤도를 이탈함으로써 발생할 수 있는 안전 문제에 유의한다. 바닥에 떨어진 구슬이 밟힘으로써 넘어질 수 있음을 항시 주의한다. 또한 구슬이 원형 궤도를 이탈하여 사람에게 날아갈 수 있음에 유의한다.

​	사용하는 궤도는 폭이 일정하고 고운 표면의 마찰력이 적은 것으로 사용한다. 구슬은 표면 흠집이 없는 구 형태의 것을 사용한다.

# Prelab 원본

* <a href="/downloadable_files/physicslab1/sisyphus_prelab.docx" download="download">Word (.docx)</a>
* <a href="/downloadable_files/physicslab1/sisyphus_prelab.pdf" download="download">PDF (.pdf)</a>



------

# 보고서

## 시지프스의 고민 실험

### 에너지 보존 법칙

#### Abstract

​	본 실험에서는 역학적 에너지 보존 법칙을 검증하였다. 미끄러짐 없는 회전 운동을 하는 공의 역학적 에너지를 분석하였다. 공의 위치 에너지와 병진 및 회전 운동 에너지를 이론적 수식으로 분석하여, 시간에 따른 공의 위치를 예상하였고, 직선 궤도 위의 공의 운동을 관찰하여 이를 확인하였다. 또한 에너지 보존 법칙을 응용하여, 원형 궤도에서 공의 운동을 예측하였다. 이론과 다르게 실험에서는 공이 빠르게 이동하는 등 오차가 발생하였다. 이러한 오차의 원인으로 레일의 마찰, 미끄러짐, 원형 궤도의 비틀림 등을 제시하였다.

## 1. 서론

### 1-1. 실험 목적

​	실에 매달려 진자 운동을 하는 시계추, 빨라지다가 느려지는 것을 반복하며 좌우로 진동하는 바이킹 놀이기구, 가속하다가 원형 코스에 진입하는 롤러코스터. 이들은 서로 다른 운동을 하는 것 같지만, 에너지 측면에서는 운동 에너지와 위치 에너지 사이의 변화가 일어난다는 점이 유사하다. 이처럼 에너지는 형태를 바꿀 수는 있지만 소멸하지는 않는다. 이러한 법칙을 에너지 보존 법칙이라고 하며, 롤러코스터와 유사한 궤도를 따라 운동하는 공을 관찰함으로써 이를 실험적으로 검증하고자 한다.

### 1-2. 이론적 배경

#### 1-2-1. 에너지 보존 법칙

​	에너지 보존 법칙에 의하면, 고립계의 내부 에너지 총합은 일정한 값을 가진다. 고로, 에너지는 자체적으로 소멸할 수 없고, 대신에 그 형태를 바꾸거나 다른 계로 전달될 수는 있다.[1]

​	이 물리학 법칙은 열역학에서, 단열 과정의 계 간 에너지 이동은 계가 한 일과 계에 한 일의 총합임을 보여주는 ‘열역학 제1법칙’과 동치다.

#### 1-2-2. 역학적 에너지 보존 법칙

​	역학적 에너지는 위치 에너지와 운동 에너지의 합을 의미한다. 에너지 보존 법칙에 의하여, 운동하는 물체의 역학적 에너지는 마찰, 저항, 열과 소리의 발생 등이 없는 가정 아래에 항상 보존된다. 이러한 법칙을 역학적 에너지 보존 법칙이라고 한다.[2]

#### 1-2-3. 실험 장치에서 공의 운동

​	물체가 미끄러지지 않으면서 병진 운동과 회전 운동을 동시에 하는 것을 미끄러짐 없는 구름 운동이라고 한다. 균일한 밀도를 가지는 공이 미끄러짐 없는 구름 운동을 한다면, 공의 위치 에너지는 $U=mgh$, 운동 에너지는 $\displaystyle K = \frac{1}{2}mv^2+\frac{1}{2}I \omega^2$다. $\displaystyle I=\frac{2}{5}mr^2$과 $v=r\omega$를 통하여, 역학적 에너지 $\displaystyle E=U+K=mgh+\frac{7}{10}mv^2$를 계산할 수 있다.[3]

​	공의 탈선을 막기 위하여, 실험 장치의 궤도는 반지름 $r _\text{rail}$인 두 레일이, 중심 사이 거리 $l$만큼 떨어진 형태를 가진다. 따라서, **그림 1**에서 $\displaystyle d=\frac{rl}{r+r _\text{rail}}$고, 공은 $\displaystyle r _\text{eff}=\sqrt{ r^2- \frac{d^2}{4} }$의 회전 운동 유효 반지름을 가지게 된다. 이를 고려하면, 공의 역학적 에너지는

$$ E=mgh+ \left( \frac{1}{2}+\frac{1}{5} \left( \frac{r}{ r _\text{eff} } \right)^2 \right) mv^2=mgh+c _\text{eff} mv^2 $$

다. 마지막 항에는 치환이 사용되었다.

​	기울기 의 궤도 위에 정지한 공이 수직 방향으로 $h$만큼 이동하면, 역학적 에너지 보존 법칙과 속도의 정의에 의하여, $\displaystyle v=\sqrt{\frac{gh}{c _\text{eff}}}$, $\displaystyle \int _0^{t(h)} v \mathrm{d}t = \frac{h}{ \sin \theta }$가 성립한다. 고로, 이 둘을 정리하여

$$ h = \frac{ g \left( \sin \theta \right)^2 }{ 4 c _\text{eff} } t^2 $$

를 얻는다. 이를 $t$-$h$ 그래프를 통하여 확인해볼 것이다.

​	기울어진 궤도를 따라 운동하는 공이 안쪽 반지름 $r _\text{cir}$의 원형 궤도의 최고점에 도달하는 상황을 생각하자. 실제로 공의 회전 반지름은 $r _\text{rot} \approx r _\text{cir} - r _\text{eff}$다.

​	최고점에서 공은 중력 이상의 구심력을 가진다. $h _\text{min}$을 최고점에 공이 도달하기 위한 최소 수직 방향 이동 거리라고 하면, $\displaystyle \frac{mv^2}{r _\text{rot}}=mg$고, 이를 정리하여

$$ h _\text{min} = \left( 2 + c _\text{eff} \right) r _\text{rot} = \left( \frac{5}{2} + \frac{1}{5} \left( \frac{ r }{ r _\text{eff} } \right) ^2 \right) r _\text{rot} $$

임을 알 수 있다.

![img](https://lh6.googleusercontent.com/9NOMPJ7wUrQq3fMx4EDAJaQ6CvY7Z74VPEl1TS6toN0mCRgZx7GzSt2Hj0hk4VwpboKDtusCtmu9xBw03LZuVE3jl9heAXS6mfqVHviRpC68tuS8J_1xjjlqkip5n7DskkocdXY)

<p style="text-align: center;"><b>그림 1: 레일과 공의 단면도 [6]</b></p>

## 2. 본론

### 2-1. 실험 방법

#### 2-1-1. 물리량 측정

​	전자 저울과 버니어 캘리퍼스, 자를 이용하여, 공 1(가벼운 공)과 공 2(무거운 공)의 질량 및 반지름, $r _\text{rail}$, $r _\text{cir}$, $l$, 직선 궤도 길이를 측정한다.

#### 2-1-2. 실험 ① 역학적 에너지 보존 검증

​	카메라를 운동면과 평행하게 설치하고, 일정한 기울기 $\theta$를 가지는 직선 궤도의 시작 지점에 공을 정지 상태로 놓아, 공이 굴러 내려가는 장면을 녹화한다. 녹화 영상을 I-CA 프로그램으로 분석하여, 시간에 따른 공의 위치를 추출한다.

​	이러한 과정을 $\theta$ = 30°, 40°에서, 공 1과 공 2를 사용하여, 각각 세 번씩 반복한다.

#### 2-1-3. 실험 ② $h _\text{min}$ 측정

​	$\theta$ = 30°의 직선 궤도에서 1cm 간격으로 공의 시작 지점을 설정한 후, 실험 ①의 과정을 시행한다. 각 공에 대하여, 어느 지점부터 공이 원형 궤도의 최고점에 도달하는 지 확인한다.

### 2-2. 실험 결과 및 데이터

​	본 보고서의 모든 실험은 조교님이 진행하였으며, 데이터 또한 모두 조교님의 것임을 밝힌다.

#### 2-2-1. 실험 장치 및 공의 물리량

​	공 1은 반지름 $r_1=1.61\text{cm}$, 질량 $m_1=31.3\text{g}$, 공 2는 반지름 $r_2=1.90\text{cm}$, 질량 $m_2=54.2\text{g}$인 구체다. 실험 장치 트랙에서 $r _\text{rail}=0.48\text{cm}$, $l=3.36\text{cm}$, $r _\text{cir}=14.6\text{cm}$다. 직선 트랙의 길이는 83cm다.

#### 2-2-2. 실험 ①의 결과

​	$\theta$ = 30°의 기울기에서 공 1과 공 2의 시간에 따른 $x$, $y$ 좌표를 구하였다. 회전 변환을 이용하여 카메라의 뒤틀림을 보정하였고, 보정된 좌표를 이용하여, 시간에 따른 수직 방향 이동 거리를 구하였다. 이론적으로는 $\displaystyle h = \frac{ g \sin^2 \theta }{ 4 c _\text{eff} } t^2$며, $t$-$h$ 그래프의 이차 추세선의 계수와 $\displaystyle \frac{ g \sin^2 \theta }{ 4 c _\text{eff} }$의 값을 비교하였다. 이상적인 계수의 값은, 공 1의 경우 $c _{30°, \text{thm}, 1} = 0.7661$, 공 2의 경우 $c _{30°, \text{thm}, 2} = 0.7973$다. **표 1**과 **표 2**에서 알 수 있듯, 오차율은 하나의 데이터를 제외하고 모두 0.3% 이내였다. **그림 2**에서 $t$-$h$ 그래프가 이론값과 아주 유사함을 확인할 수 있다.

<p style="text-align: center;"><b>표 1: 공 1 ($\theta$ = 30°)의 시간-수직 방향 이동 거리 그래프</b></p>

|          | **추세선의 이차항 계수** | **오차율 (%)** |
| :------: | :----------------------: | :------------: |
| **1차**  |          0.7638          |     0.3008     |
| **2차**  |          0.7655          |     0.0789     |
| **3차**  |          0.7644          |     0.2225     |
| **평균** |          0.7646          |     0.2007     |



<p style="text-align: center;"><b>표 2: 공 2 ($\theta$ = 30°)의 시간-수직 방향 이동 거리 그래프</b></p>

|          | **추세선의 이차항 계수** | **오차율 (%)** |
| :------: | :----------------------: | :------------: |
| **1차**  |          0.7970          |     0.0361     |
| **2차**  |          0.7965          |     0.0988     |
| **3차**  |          0.7700          |     3.4225     |
| **평균** |          0.7878          |     1.1858     |



![img](https://lh4.googleusercontent.com/cp75kFCoUjby0RWMmOHp_aINmORqcMMi5awla-kH4WQD9o0qEyEAnVR5FLK4MPpwYtYWi8MFZDV059Ldzh9jSTUhbuoKaQKiA9OteMqUUFG-dI7jw3Xgp4ZsLt0TF_pni8PknWY)

![img](https://lh6.googleusercontent.com/IquGRBWCnmlhff2AaaiQCL5be_-3_nSAULc1af51qmV9nxhPf_QGWZcx9mcx8vERNvVFTdrh6n93dmW-YmUhF9I5wlfeldFo59eat7TjE2x15ZSyMbZlc9_iVvCM3qcvzfipqto)

<p style="text-align: center;"><b>그림 2: 공 1과 공 2의 시간-거리 그래프 ($\theta$ = 30°)</b></p>

<p style="text-align: center;">각 공에 대하여, 세 번의 실험 결과(파란색, 녹색, 보라색 실선)와 함께 이론적 곡선(빨간 점선)을 그려 넣었다. 측정값이 이론값과 매우 유사함을 확인할 수 있다.</p>

​	위와 유사하게, $\theta$ = 40°의 기울기에서도 공 1과 공 2의 시간에 따른 수직 방향 이동 거리를 구하여, $t$-$h$ 그래프의 추세선의 이차항 계수와 $\displaystyle \frac{ g \sin^2 \theta }{ 4 c _\text{eff} }$의 값을 비교하였다. 이론값은, 공 1은 $c _{40°, \text{thm} ,1}=1.2661$, 공 2는 $c _{40°, \text{thm}, 2}=1.3177$다. **표 3**과 **표 4**에서 알 수 있듯, 오차율은 모두 15% 근방이었다. $\theta$ = 30°의 경우와 다르게 다소 큰 오차율을 보이며, **그림 3** 또한 그래프가 이론값을 조금 벗어나는, **그림 2**와 대조되는 양상을 보인다. 이러한 결과의 원인에 대해서는 2-3절에서 다룬다.

<p style="text-align: center;"><b>표 3: 공 1 ($\theta$ = 40°)의 시간-수직 방향 이동 거리 그래프</b></p>

|          | **추세선의 이차항 계수** | **오차율 (%)** |
| :------: | :----------------------: | :------------: |
| **1차**  |          1.4767          |    16.6298     |
| **2차**  |          1.4449          |    14.1182     |
| **3차**  |          1.4507          |    14.5763     |
| **평균** |          1.4574          |    15.1081     |



<p style="text-align: center;"><b>표 4: 공 2 ($\theta$ = 40°)의 시간-수직 방향 이동 거리 그래프</b></p>

|          | **추세선의 이차항 계수** | **오차율 (%)** |
| :------: | :----------------------: | :------------: |
| **1차**  |          1.5168          |    15.1114     |
| **2차**  |          1.5053          |    14.2387     |
| **3차**  |          1.5160          |    15.0507     |
| **평균** |          1.5127          |    14.8003     |



![img](https://lh4.googleusercontent.com/l-c20WSqhQrogzLdL73XgIIETlhkMaNK29KxG5V3a4raEoA0hz3gIJg4OJoK6cYQAecC_CyXS5_bfyjlVVPvj8WlFQJfrhypDEs3ffdQlythmVjMEvPuu_vr8vcRDs_ytP0XEdY)

![img](https://lh3.googleusercontent.com/iOhP8GVFam8ZrO6d4l2JqdVdtYJlZx3yaUvtawICkcPgRGpN1KFufPZJ9MPmMFwAu89XelBrkob8GOGGaD6-KSxaADf1tRjoxYSd49swxE6KuqJG8vW0pwaPjlw5UwXCwuL2i4k)

<p style="text-align: center;"><b>그림 3: 공 1과 공 2의 시간-거리 그래프 ($\theta$ = 30°)</b></p>

<p style="text-align: center;">각 공에 대하여, 세 번의 실험 결과(파란색, 녹색, 보라색 실선)와 함께 이론적 곡선(빨간 점선)을 그려 넣었다. 측정값이 이론값과 다소 벗어남을 확인할 수 있다.</p>

#### 2-2-3. 실험 ②의 결과

​	기울기를 $\theta$ = 30°로 설정한 후, 시작 3~6cm 지점에서 공 1을, 5~8cm 지점에서 공 2를 놓아, 공이 원형 궤도의 최고점에 도달하는지 여부를 확인하였다. **그림 4**와 **그림 5**는 공의 이동 경로를 나타낸 것이다.

​	공 1은 시작 5cm 지점부터, 공 2는 시작 8cm 지점부터 경로가 일그러짐을 확인할 수 있었다. 각각의 수직 방향 높이는 39cm, 37.5cm로, 이론값 37.07cm, 35.75cm과 유사하였다.

![img](https://lh4.googleusercontent.com/ONaH-Jns8T9lEtAbLSQG7tRptdsxexp_yaxaHH98oWthwrVxj4xORZ2jLPcjqKOElBf-66CC_SDIETbiQ7P_ndgVJSuhdPHTAZ1Ew8fcOD7-hEua93Z_xTao69k1wYiYgtWV0kk)

<p style="text-align: center;"><b>그림 4: 시간에 따른 공 1의 위치</b></p>



![img](https://lh4.googleusercontent.com/1LzppLlPzm7XBfFSiBFp5Vt64IYU8LhPVnduH3l3XK2ed7B0UFoXkvviqIpk1UDcgIEMJGSG_4XvQ6pAP__7zDnibYLmFX_ygKPhLV7TrydptN9UCS-yVbOl05hBxFrUIIgtpts)

<p style="text-align: center;"><b>그림 5: 시간에 따른 공 2의 위치</b></p>

### 2-3. 오차 분석

​	본 절은 실험 측정에서 발생한 오차에 대하여 다룬다. 오차 발생 원인을 분석하고, 이러한 오차를 줄이는 개선 방법에 대하여 논의한다.

#### 2-3-1. 레일과 마찰에 의한 오차

​	실험 ①에서 $\theta$ = 30°인 경우, 모든 측정값이 이론값보다 작음을 관찰할 수 있다. 이는 수직 방향 이동 거리가 이론보다 작다는 것을 의미하며, 시간이 지날수록 공의 역학적 에너지가 감소함을 뜻한다.

​	1-2절 이론적 배경에서 논하였듯, 역학적 에너지 보존 법칙은 마찰로 인하여 열 에너지나 소리 에너지 등이 발생하지 않는 가정 하에서만 성립한다. 고로, 이론값보다 약간 작은 측정값은 실제 실험 환경에서 발생한 마찰력이 반영된 결과라고 해석할 수 있다.

​	동일한 논리로, 실험 ②의 $h _\text{min}$ 측정값이 이론값보다 컸던 이유를 설명할 수 있다. 마찰에 의하여, 공은 시간이 지남에 따라 역학적 에너지를 점점 잃어버렸고, 고로 원형 궤도의 최고점에 도달하기 위하여 더 높은 시작 지점을 필요로 하게 되었다.

​	그러나, 마찰력은 공의 구름 운동을 가능하게 하는 필수적인 요소다. 또한 마찰을 완전하게 제거하는 것은 현실적으로 불가능하다. 따라서, 공과 트랙 사이의 마찰력을 측정한 후, 이를 $h$와 $t$의 관계식에 반영한다면, 더 정확한 결과값을 얻을 수 있을 것이다.

#### 2-3-2. 공의 미끄러짐으로 인한 오차

​	실험 ①에서 $\theta$ = 40°인 경우에는 $\theta$ = 30°와 대비될 정도로 큰 오차가 발생하였다. 뿐만 아니라, $\theta$ = 40°의 측정값은 모두 이론값보다 컸다. 이를 시간이 지남에 따라 공의 역학적 에너지가 커졌다고 해석할 수 있으나, 공이 외부에서 추가적인 힘을 받지 않는 이상, 이는 불가능하다. 고로, 공이 미끄러짐 운동을 하였다고 해석하는 것이 옳을 것이다.

​	미끄러짐 때문에 $\displaystyle \omega < \frac{v}{r _\text{eff}}$가 되어, $\displaystyle c _\text{real} = \frac{K}{mv^2} = \frac{1}{2} + \frac{ I \omega^2 }{ 2mv^2 }$의 값은 $\displaystyle c _\text{eff} = \frac{1}{2} + \frac{1}{5} \left( \frac{r}{r _\text{eff}} \right)^2$보다 작아지게 되었다. 미끄러짐이 없는 이상적인 경우에는 $c _\text{real}=c _\text{eff}$다.

​	미끄러짐을 고려한다면, $\displaystyle h= \frac{g \sin^2 \theta }{ 4 c _\text{real} } t^2$다. $t$-$h$ 그래프의 추세선의 이차항 계수가 $c _{40°, \text{real}}$라면, $\displaystyle c _\text{real} = \frac{ g \sin^2 \theta }{ 4 c _{40°, \text{real}} }$임을 이용하여 $c _\text{real}$의 값을 실험적으로 구할 수 있다. **표 5**는 실험 ①의 $\theta$ = 40° 데이터를 통하여 계산한 $c _\text{real}$의 값을 보여준다. 예상대로 $c _\text{real} < c _\text{eff}$가 성립함을 확인할 수 있다.

​	$\theta$ = 30°과 다르게 $\theta$ = 40°에서 미끄러짐이 발생한 이유는, $\theta$가 너무 크기 때문이라고 생각할 수 있다. 공이 경사면을 미끄러지지 않으면서 이동할 조건은 $\displaystyle \frac{ \tan \theta }{ 1 + \frac{ mr^2 }{ I } } \le \mu_0$다[4, 5]. 고로, 레일의 마찰 계수가 $0.1650 \le \mu_0  < 0.2397$라고 예상할 수 있을 것이다.

<p style="text-align: center;"><b>표 5: 이론값 $c _\text{eff}$와 데이터를 통하여 계산한 $c _\text{real}$</b></p>

<p style="text-align: center;">공의 미끄러짐에 의하여 $\omega &lt; \frac{v}{r _\text{eff}}$가 되어 이론과 다르게 $c _\text{real} &lt; c _\text{eff}$가 됨을 확인할 수 있다.</p>

|          |         $c _\text{real}$         |         $c _\text{eff}$         |
| :------: | :------------------------------: | :-----------------------------: |
| **공 1** | $c _{ \text{real}, 1 } = 0.6950$ | $c _{ \text{eff}, 1 } = 0.8000$ |
| **공 2** | $c _{ \text{real}, 2 } = 0.6696$ | $c _{ \text{eff}, 2 } = 0.7688$ |

#### 2-3-3. 원형 궤도의 비틀림으로 인한 오차

​	실험 ②에서 측정값은 모두 이론값보다 컸으며, 이는 $h _\text{min} = \left( 2 + c _\text{eff} \right) r _\text{rot}$에서 $c _\text{eff}$ 혹은 $r _\text{rot}$의 실제 값이 이론값보다 크다는 것을 의미한다. $\theta$ = 30°에서 $c _\text{eff}$의 이론값과 측정값은 0.3%의 오차율을 보일 정도로 유사한 값을 가졌기 때문에, $r _\text{rot}$에서 오차가 발생하였다고 예상할 수 있다.

​	실험에 사용된 원형 궤도는, 한 바퀴를 돌았을 때 앞으로 8cm가량 나오는 트랙을 가진다. 즉, 원형 궤도는 정확한 원이 아닌, 옆으로 기울어진 타원 형태를 가지게 된다. 이를 고려하여 다시 계산하면, $r _\text{cir}=15.21\text{cm}$가 된다. **표 6**은 개선된 $r _\text{cir}$값으로 계산했을 때의 $h _\text{min}$ 이론값을 보여준다. 이전보다 오차가 더욱 줄어듦을 확인할 수 있다.

<p style="text-align: center;"><b>표 6: $h _\text{min}$의 이론값, 측정값 및 개선된 $r _\text{cir}$로 계산한 이론값 (단위: cm)</b></p>

<p style="text-align: center;">개선된 이론값은 기존의 이론값보다 측정값에 더욱 가까움을 확인할 수 있다.</p>

|          | **이론값** | **측정값** | **개선된 이론값** |
| :------: | :--------: | :--------: | :---------------: |
| **공 1** |   37.07    |     39     |      38.920       |
| **공 2** |   35.75    |    37.5    |      37.575       |

​	1-2절 이론적 배경에서 $r _\text{rot} \approx r _\text{cir} - r _\text{eff}$라고 하였지만, 실제로는 $r _\text{rot} \ge r _\text{cir} - r _\text{eff}$로 약간 더 큰 값을 가진다. 이 또한 $h _\text{min}$의 이론값이 측정값보다 작은 이유를 설명한다.

## 3. 결론

​	본 실험에서는 서로 다른 질량의 공 두 개를 다양한 각도의 직선 궤도 위에서 굴려봄으로써 물체의 역학적 에너지의 보존 여부에 대하여 알아보았다. 미끄러짐이 일어나지 않는, 가파르지 않은 비탈면에서는 공의 역학적 에너지가 보존됨을 확인하였다. 뿐만 아니라, 역학적 에너지 보존 법칙을 확장하여, 공이 원형 궤도의 최고점에 진입하기 위한 최소 높이를 식을 통하여 예측하였고, 이를 실제 측정값과 비교하였다.

​	실험의 측정값은 이론과 정확하게 일치하지 않았다. 공의 역학적 에너지는 시간이 지남에 따라 점점 감소함을 확인하였고, 직선 궤도가 가파르면 오히려 역학적 에너지가 증가하는 현상을 보였다. $h _\text{min}$값 또한 이론보다 더 큰 값을 가졌다. 이러한 오차의 원인은 공과 레일 사이의 마찰력, 공의 운동 중 발생한 미끄러짐, 실험 장비의 원형 궤도의 비틀림 등이 있었다. 제시한 원인은 실험에서 발생한 오차를 설명하기에 충분하였고, 제시한 오차 해결 방안 또한 실현 가능성이 충분하다고 생각된다. 고로 이를 보정하여 더욱 정확한 실험을 진행할 수 있으리라 기대된다.

## 4. 참고 문헌

[1] Halliday. et al, “일반물리학”, 개정10판, John Wiley & Sons, Inc. p.224-227.

[2] 동책. p.210-212.

[3] 동책. p.336-339.

[4] 동책. p.341.

[5] Feynmann, “The Feynman Lectures on Physics”, The *NEW MILLENNIUM* edition, Basic Books.

[6] 서울대학교 물리학실험 매뉴얼, “실험 1-3. 시지프스의 고민”. Retrieved 1 May 2020.

# 보고서 원본

* <a href="/downloadable_files/physicslab1/sisyphus_report.docx" download="download">Word (.docx)</a>
* <a href="/downloadable_files/physicslab1/sisyphus_report.pdf" download="download">PDF (.pdf)</a>
