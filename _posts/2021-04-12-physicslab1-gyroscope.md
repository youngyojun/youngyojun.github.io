---
title: "물리학실험1 자이로스코프"
date: 2021-04-12 01:02:23
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

## 토크와 각운동량

### 1. 실험 목적

​	전통 놀이인 팽이 치기를 생각하자. 줄로 팽이의 옆을 강하게 내려침에도 불구하고, 팽이는 옆으로 넘어지지 않으며 회전한다. 이러한 현상은 자이로스코프의 실험을 이용하여 설명할 수 있다. 본 실험에서는 자이로스코프의 세차 운동을 관찰하고, 이러한 회전 운동을 토크와 각운동량을 이용하여 이론적으로 설명한다.

### 2. 배경 지식

#### 2-1. 토크 및 각운동량

​	토크는 회전하는 물체에 관한 물리량이다. 힘 $\displaystyle \overrightarrow{F}$가 $\displaystyle \overrightarrow{r}$의 작용점에 작용하였다면, 토크는

$$ \overrightarrow{ \tau } = \overrightarrow{r} \times \overrightarrow{F} $$

로 정의된다. 회전운동의 토크는 병진운동의 힘과 그 의미가 유사하다. 이를 확장하여, 병진운동의 운동량을 회전운동의 각운동량에 대응시킬 수 있다. 회전하는 물체의 각운동량은

$$ \overrightarrow{L} = \overrightarrow{r} \times \overrightarrow{p} = m \overrightarrow{r} \times \overrightarrow{v} $$

로 정의된다.

​	회전 운동을 하는 물체에 토크 $\displaystyle \overrightarrow{ \tau }$가 작용하면

$$ \overrightarrow{ \tau } = \overrightarrow{r} \times \overrightarrow{F} = m \overrightarrow{r} \times \overrightarrow{a} = m \overrightarrow{r} \times \frac{ \mathrm{d} \overrightarrow{v} }{ \mathrm{d} t } + m \frac{ \mathrm{d} \overrightarrow{r} }{ \mathrm{d} t } \times \overrightarrow{r} = \frac{ \mathrm{d} \overrightarrow{L} }{ \mathrm{d} t } $$

이므로, 물체의 각운동량 $\displaystyle \overrightarrow{L}$은 변화한다.

$$ L = \sum _i m _i r _i^2 \omega = I \omega $$

에서 관성 모멘트 $I$는, $p=mv$에서 질량과 그 의미를 공유함을 알 수 있다.

#### 2-2. 자이로스코프 세차 운동

​	자이로스코프의 회전축을 $x$축의 양의 방향으로 설정한 후, 한 쪽 끝을 고정한 다음, 관성 바퀴가 회전하지 않는 상황을 생각하자. 중력 $\displaystyle \overrightarrow{F}$은 $-z$ 방향, $\displaystyle \overrightarrow{r}$은 $+x$ 방향이므로, $\displaystyle \overrightarrow{ \tau } = \overrightarrow{r} \times \overrightarrow{F}$에서 토크는 $+y$ 방향임을 알 수 있다. 따라서

$$ \frac{ \mathrm{d} \overrightarrow{L} }{ \mathrm{d} t } = \overrightarrow{ \tau } $$

에서, 각운동량 $\displaystyle \overrightarrow{L}$은 $+y$ 방향으로 증가함을 알 수 있다. 이는 관성 바퀴가 $-z$ 방향으로 더 빠르게 회전할 것이라고 해석할 수 있다.

​	관성 바퀴가 회전하는 상황을 생각하자. 회전에 의한 초기 각운동량 $\displaystyle \overrightarrow{L}$와, 토크 $\displaystyle \overrightarrow{ \tau }$에 의한 각운동량 변화 $\displaystyle \mathrm{d} \overrightarrow{L}$는 항상 서로 수직이다. $\displaystyle \overrightarrow{L}$은 $\displaystyle \overrightarrow{r}$과 항상 평행하나, $\displaystyle \overrightarrow{ \tau }$는 $\displaystyle \overrightarrow{r}$과 수직이기 때문이다. $\displaystyle \overrightarrow{L}$과 $\displaystyle \frac{ \mathrm{d} \overrightarrow{L} }{ \mathrm{d} t }$가 항상 수직하므로, $\displaystyle \overrightarrow{L}$은 시간이 지남에 따라 $xy$ 평면 위에서 회전하나, 그 크기는 변하지 않는다. 이는 관성 바퀴의 회전축이 $xy$ 평면 상에서 일정한 방향과 속력을 가지고 회전한다고 해석할 수 있다. 이렇듯 관성 바퀴가 떨어지지 않고 계속 회전하는 운동을 세차 운동이라고 한다.

​	세차 운동을 하는 자이로스코프의 세차 각도를 $\phi _p$, 세차 각속도를 $\omega _p$라 하면

$$ \omega _p = \frac{ \mathrm{d} \phi _p }{ \mathrm{d} t } = \frac{ \mathrm{d} }{ \mathrm{d} t } \left( \frac{ \left\lVert \mathrm{d} \overrightarrow{L} \right\rVert }{ \left\lVert \overrightarrow{L} \right\rVert } \right) = \frac{ 1 }{ \left\lVert \overrightarrow{L} \right\rVert } \left\lVert \frac{ \mathrm{d} \overrightarrow{L} }{ \mathrm{d} t } \right\rVert = \frac{ \left\lVert \overrightarrow{ \tau } \right\rVert }{ I \omega } = \frac{ mgr }{ I \omega } $$

임을 알 수 있다.

#### 2-3. 자이로스코프 장동 운동

​	자이로스코프에서 세차 운동이 일어나면, 세차 운동 자체의 회전으로 인하여, 각운동량의 $z$축 성분 또한 변화하게 된다. 결과적으로 복합적인 연관 관계에 의하여, 관성 바퀴는 $xy$ 평면 상의 세차 운동과 더불어 $z$축 방향에서 상하로 진동하는 장동 운동을 동시에 하게 된다.

### 3. 실험 방법

#### 3-1. 실험 장치 세팅 및 물리량 측정

​	균형추, 무게 추의 질량을 측정한다. 관성 바퀴의 반지름, 관성 바퀴 중심과 균형추 중심, 거치대 중심과의 거리 등을 측정한다.

​	자이로스코프 실험 장치를 컴퓨터와 연결하여, SensorLAB에서 장치를 올바르게 인식할 수 있는지 확인한다.

​	수평계 등을 이용하여 자이로스코프 실험 장치의 수평을 확인한다. 수평 조절 볼트를 이용하여 수평을 조절할 수 있다.

​	관성 바퀴의 초기 토크를 없애기 위하여, 균형추를 통하여 회전축의 좌우 무게균형을 맞춘다.

#### 3-2. 실험 ① 세차 운동 관찰

​	실험 ①에서는 자이로스코프의 세차 운동을 관찰한다. 거치대에 무게 추를 설치하고, 관성 바퀴를 회전시켜 세차 운동을 관찰한다. 회전 속도를 충분히 빠르게 하고 회전축을 손으로 가볍게 밀어, 장동 운동이 관찰되지 않도록 한다.

​	위와 같은 과정을 여러 개의 무게 추에 대하여 여러 번 반복하며, 운동의 관찰 데이터를 수집한다.

#### 3-3. 실험 ② 장동 운동 관찰

​	실험 ②에서는 자이로스코프 실험 장치에 세 가지 초기 조건을 주었을 때, 각각의 장동 운동을 관찰한다.

​	첫 번째로 회전축을 정지시킨 후 가볍게 놓아 장동 운동을 관찰한다. 두 번째로 세차 운동과 반대 방향으로 회전축을 밀어준 후의 장동 운동을 관찰한다. 마지막으로, 세차 운동과 같은 방향으로 회전축을 밀어주어 장동 운동을 관찰한다.

​	각 초기 조건에 대해 장동 운동의 양상을 분석하고, 서로 비교한다.

#### 3-4. 오차 분석 추가실험

​	자이로스코프의 세차 운동과 장동 운동은 서로에게 영향을 주며 복합적인 연관 관계를 보여준다. 이론적 배경에서는 세차 운동이 장동 운동에만 영향을 준다고 생각하였지만, 실제로는 장동 운동이 다시 세차 운동에 영향을 주기 때문에, 실험 측정값은 이론값과 차이를 보일 것이다.

​	세차 운동과 장동 운동 간의 관계를 이계 연립 미분방정식으로 설명할 수 있다. 물체에 일정한 힘을 작용시키는 장비를 이용하여, 실험 ②의 과정을 더 엄밀하고 정량적으로 진행한다. 이후, 관성 바퀴의 삼차원적 운동과 미분방정식의 해를 비교하여, 이전 실험에 비하여 그 오차가 줄어들었는지를 확인한다.

### 4. 실험 장비

​	3절에 서술한 세 종류의 실험을 진행하기 위해서는 다음과 같은 장비가 필요하다. 자이로스코프 실험 장치와 컴퓨터, 여러 개의 무게 추, 전자 저울, 1m 자 및 버니어 캘리퍼스가 필요하다.

​	물리량 측정을 위하여 실험 장치에서 원판을 무리하게 분리하면 안된다. 원판과 실험 장치 사이에 여러 센서가 존재하기 때문에, 원판 분리시에는 이러한 민감성에 유의한다.

​	관성 바퀴를 회전시키기 위하여 줄을 당길 때, 너무 빠르게 당길 경우 원판이 분리되면서 장비가 파손될 수 있다.

​	실험 장치의 수평과 초기 토크를 정밀하게 맞추지 않을 경우, 실험 도중 관성 바퀴가 회전하면서 실험 장치의 축에 무리를 줄 수 있다. 이는 곧 실험 장치의 파손과 연관되므로 유의한다.

​	실험 과정에서 회전축에 손이 끼이지 않도록 안전에 주의한다.

# Prelab 원본

* <a href="/downloadable_files/physicslab1/gyroscope_prelab.docx" download="download">Word (.docx)</a>
* <a href="/downloadable_files/physicslab1/gyroscope_prelab.pdf" download="download">PDF (.pdf)</a>



------

# 보고서

## 자이로스코프 실험

### 토크와 각운동량

#### Abstract

​	본 실험에서는 토크와 각운동량의 개념을 활용하여, 자이로스코프의 세차 운동과 장동 운동을 관찰하고, 이를 이론적으로 설명하여 보았다. 다양한 초기 조건을 주었을 때, 관성 바퀴가 어떤 운동을 하는지에 대하여 분석하였다. 측정값은 특정 조건 아래에서 예상값과 5% 이내의 오차를 가졌으며, 이론을 실험적으로 검증할 수 있었다. 이론적 분석의 한계, 측정 오차 및 장치의 한계 등을 오차 원인으로 제시하였다.

## 1. 서론

### 1-1. 실험 목적

​	전통 놀이인 팽이 치기는 팽이의 옆면을 줄로 강하게 내려치면서, 누구의 팽이가 더 오랫동안 도는 지를 겨루는 놀이다. 여기서 팽이의 옆으로 힘이 가해짐에도 불구하고 팽이는 넘어지지 않으며 회전한다. 이러한 현상은 자이로스코프 실험을 통하여 그 원리를 설명할 수 있다. 본 실험은 자이로스코프의 세차 운동을 관찰하고, 토크 및 각운동량의 개념을 이용하여 이러한 회전 운동을 이론적으로 설명한다.

### 1-2. 이론적 배경

#### 1-2-1. 토크 및 각운동량

​	토크는 회전 운동을 하는 물체에 관한 물리량이다. 작용점 $\displaystyle \overrightarrow{r}$에 힘 $\displaystyle \overrightarrow{F}$가 작용하면 토크는

$$ \overrightarrow{ \tau } = \overrightarrow{r} \times \overrightarrow{F} $$

로 정의된다. 회전 운동에서 토크는, 병진 운동에서 힘과 의미가 비슷하다. 이러한 개념을 확장하여, 병진 운동에서 운동량을 회전 운동에서 각운동량에 대응할 수 있다. 즉, 회전 운동을 하는 물체의 각운동량은

$$ \overrightarrow{L} = \overrightarrow{r} \times \overrightarrow{p} = m \overrightarrow{r} \times \overrightarrow{v} $$

로 정의된다.[1]

​	회전 운동을 하는 물체에 토크 $\displaystyle \overrightarrow{ \tau }$가 작용한다면

$$ \overrightarrow{ \tau } = \overrightarrow{r} \times \overrightarrow{F} = m \overrightarrow{r} \times \overrightarrow{a} = m \overrightarrow{r} \times \frac{ \mathrm{d} \overrightarrow{v} }{ \mathrm{d} t } + m \frac{ \mathrm{d} \overrightarrow{r} }{ \mathrm{d} t } \times \overrightarrow{r} = \frac{ \mathrm{d} \overrightarrow{L} }{ \mathrm{d} t } $$

이므로, 물체의 각운동량 $\displaystyle \overrightarrow{L}$은 단위 시간에 대하여 만큼 변화한다. 더 나아가 $\displaystyle L = \sum _i m _i r _i^2 = I \omega$에서 관성 모멘트 $I$는 식 $p = mv$에서 질량 $m$과 의미가 유사하다.[1]

#### 1-2-2. 자이로스코프 세차 운동

​	**그림 1**과 같이, $x$축 양의 방향을 자이로스코프 회전축으로 잡은 다음, 축의 한 쪽 끝을 고정하며, 관성 바퀴가 회전하고 있지 않은 경우를 생각하자. $\displaystyle \overrightarrow{F}$는 중력을 의미하고, $\displaystyle \overrightarrow{r}$는 $+x$ 방향이므로, 토크 $\displaystyle \overrightarrow{\tau} = \overrightarrow{r} \times \overrightarrow{F}$는 $+y$ 방향이다. 고로 $\displaystyle \frac{ \mathrm{d} L }{ \mathrm{d} t } = \overrightarrow{ \tau }$에서, 각운동량 $\displaystyle \overrightarrow{L}$은 $+y$ 방향으로 증가하며, 관성 바퀴가 중력 방향으로 빠르게 회전하게 된다.

​	**그림 2**과 같이, 좌표계는 **그림 1**과 똑같되, 관성 바퀴가 회전하고 있는 경우를 생각하자. 회전에 의하여 생기는 초기 각운동량 $\displaystyle \overrightarrow{L}$과 토크 $\displaystyle \overrightarrow{ \tau }$에 의하여 생기는 각운동량의 순간 변화량 $\displaystyle \mathrm{d} \overrightarrow{L}$은 항상 서로 수직을 이룬다. 따라서, **그림 2-(b)**과 같이, $\displaystyle \overrightarrow{L}$은 크기를 유지하면서 $xy$ 평면 위에서 회전한다. 이와 같이, 관성 바퀴가 중력 방향으로 떨어지지 않고 일정하게 회전하는 운동을 세차 운동이라고 한다. 이때, 세차 각속도 $\omega _p$에 대하여

$$ \omega _p = \frac{ \mathrm{d} \phi _p }{ \mathrm{d} t } = \frac{ \mathrm{d} }{ \mathrm{d} t } \left( \frac{ \left\lVert \mathrm{d} \overrightarrow{L} \right\rVert }{ \left\lVert \overrightarrow{L} \right\rVert } \right) = \frac{1}{ \left\lVert \overrightarrow{L} \right\rVert } \left\lVert \frac{ \mathrm{d} \overrightarrow{L} }{ \mathrm{d} t } \right\rVert = \frac{ \left\lVert \overrightarrow{ \tau } \right\rVert }{ I \omega } = \frac{ mgr }{ I \omega } $$

가 성립한다.

![img](https://lh6.googleusercontent.com/YNy8QN-EtVw7rlQu9RTQE_i4Ij0hsoG5PabZZBCZuiuxlQ4WGPdvArz_UR1T7_IMJqy9cjp-2OALHPLrcTQPHyG6nUXjyJvyzVFOaX9EIIa68KO6gPpqhSmzDcY5z5l2fjGx3J0)

<p style="text-align: center;"><b>그림 1: 회전하지 않는 관성 바퀴의 모식도[2]</b></p>

![img](https://lh3.googleusercontent.com/IjVq_bPlYXpeZtXfD15Ysyu3EDieT3VVe4NVuqtQAKmKbCJklmk0cLd1LSkxX0_6GALXDMkKyWYibogH88iH27k2HIJpJqsf6efsJiEzOX5aSAYcUmTNoIRTlUVvViaZj4VYdJ0)

<p style="text-align: center;"><b>그림 2: 회전하는 관성 바퀴의 모식도[2]</b></p>

#### 1-2-3. 자이로스코프 장동 운동

​	자이로스코프에서 관성 바퀴에 회전을 가하면 세차 운동이 일어난다. 여기서 세차 운동 자체의 회전에 의하여, 각운동량 $\displaystyle \overrightarrow{L}$의 $z$축 성분도 변화하게 된다. 이는 관성 바퀴가 $xy$ 평면 위에서 회전하는 세차 운동과, $z$축 방향에서 상하로 진동하는 장동 운동을 동시에 하도록 만든다. 세차 운동과 장동 운동은 서로에게 복합적으로 영향을 미친다.

## 2. 본론

### 2-1. 실험 방법

#### 2-1-1. 실험 장치 설치 및 물리량 측정

​	균형추와 무게 추의 질량을 전자 저울로 측정한다. 균형추를 자이로스코프의 회전축에 끼워, 회전축이 평형을 이루도록 한다. 이때 수평계를 사용하여 수평을 확인할 수 있다. 수평 조절 볼트를 활용하여 수평을 세밀하게 조절하도록 한다. 이후, 추와 관성 바퀴의 반지름 및 두께, 거치대의 중심과 이루는 거리 등을 버니어 캘리퍼스로 측정한다. 측정값을 바탕으로 관성 바퀴의 질량을 계산한다.

​	자이로스코프 실험 장치와 컴퓨터를 연결한 후, SensorLAB에서 장치 인식과 측정이 올바르게 이루어지는지 확인한다.

#### 2-1-2. 실험 ① 세차 운동 관찰

​	거치대에 무게 추를 설치한 후, 관성 바퀴를 빠르게 회전시킨다. 육안으로 장동 운동이 관찰되지 않을 때까지, 자이로스코프의 회전축을 손으로 밀어, 더 빠르게 회전할 수 있도록 한다. 이후, 관성 바퀴의 회전 속도와 회전 각을 측정한다. 이와 같은 과정을 다양한 질량의 추를 여러 위치에 설치하여 반복한다.

#### 2-1-3. 실험 ② 장동 운동 관찰

​	실험 ①과 동일한 과정을 시행하되, 다양한 초기 조건에 대하여 자이로스코프의 장동 운동을 관찰하기 위하여, 회전축을 돌리는 방법을 다르게 한다. 회전축의 초기 조건을 다음 세 가지를 고려한다: 첫째로 회전축을 정지한 후 가볍게 놓는다. 둘째로 회전 방향과 반대로 회전축을 밀어준다. 셋째로 회전 방향과 같은 방향으로 회전축을 밀어준다. 각 과정에 대하여 관성 바퀴의 회전 속도와 회전 각, 회전축의 기울어진 정도(Tilt)를 측정한다.

### 2-2. 실험 결과 및 데이터

​	본 보고서의 모든 실험은 조교님이 진행하였고,데이터 또한 모두 조교님의 것임을 밝힌다.

#### 2-2-1. 실험 장치 설치 및 물리량 측정

​	100g 무게 추와 200g 무게 추의 질량은 각각 101.4g, 204,5g이었다. 균형추는 큰 것과 작은 것을 사용하였고, 각각의 질량은 873.4g, 38.9g이었다. 관성 바퀴의 반지름은 12.9cm고, 지레의 원리를 통하여 계산한 결과, 질량은 약 1.33kg, 관성 모멘트는 $I = 1.125 \times 10^{-2} \text{kg} \cdot \text{m}^2$다.

#### 2-2-2. 실험 ①의 결과

​	0.02초 단위로 자이로스코프 장치의 회전 각과 회전 속도를 측정하였다. 실험 장치의 회전축 첫 번째 홈에 100g 혹은 200g의 무게 추를 설치한 후, 세차 운동을 관찰하는 과정을 총 3회 반복하였다. 무게 추가 100g으로 가벼운 경우에는 표 1과 같이 5% 이내의 오차율을 보여준 반면, 200g으로 무거운 경우 최대 40%까지 오차가 발생하는 양상을 보였다.

#### 2-2-3. 실험 ②의 결과

​	실험 장치 회전축의 제일 안쪽과 바깥쪽의 홈에, 100g 혹은 200g의 무게 추를 설치한 후, 세차 운동과 함께 장동 운동을 관찰하는 과정을 총 4회 반복하였다.

​	**그림 3**과 같이, 세차 운동과 장동 운동이 동시에 관찰되는 모든 경우에 대하여, 실험 장치의 회전 각은 전반적으로 증가하는 추세이나, 일정한 주기를 가지고 진동하는 형태를 보였다.

​	**그림 4**는 네 종류의 초기 세팅에 대하여 실험하였을 때, 시간에 따라서 실험 장치의 수평 회전축이 기울어진 정도를 나타낸 것이다. 모든 초기 조건에 대하여, 1차 실험은 회전축을 세차 운동 방향으로 밀어준 경우, 2차와 3차는 회전축을 가만히 놓아준 경우, 4차는 회전축을 세차 운동의 역방향으로 밀어준 경우에 얻어낸 데이터다.

<p style="text-align: center;"><b>표 1: 안쪽 위치에 100g 무게 추 설치 후 세차 운동</b></p>

|         | **측정값 (rad/s)** | **이론값 (rad/s)** | **오차율 (%)** |
| :-----: | :----------------: | :----------------: | :------------: |
| **1차** |       0.7789       |       0.8183       |     4.8149     |
| **2차** |       0.6420       |       0.6701       |     4.1934     |
| **3차** |       0.8385       |       0.8616       |     2.6811     |

<p style="text-align: center;"><b>표 2: 안쪽 위치에 200g 무게 추 설치 후 세차 운동</b></p>

|         | **측정값 (rad/s)** | **이론값 (rad/s)** | **오차율 (%)** |
| :-----: | :----------------: | :----------------: | :------------: |
| **1차** |       0.9087       |       1.4643       |     37.943     |
| **2차** |       1.4031       |       1.5744       |     10.880     |
| **3차** |       1.5444       |       1.7619       |     12.345     |

![img](https://lh5.googleusercontent.com/gAc13dp-otWdHxni4A2JR1R7FwtBE8jwgNO6lzZSv3defFR4YeaHJfle4lAhpkSvS2Gpu5NBaWaBKFLEtQUK66LWa22ZJrtHfgx7oow_p3U71gRzcwgcbb1yEOsMWg-KMgqsfDI)

<p style="text-align: center;"><b>그림 3: 시간-수직중심축 회전각 그래프 (100g 무게 추, 바깥쪽 홈)</b></p>

![img](https://lh3.googleusercontent.com/u0l4xsICOvo5TFMDLuMhaa6Xa44bmMrFhKBjjlnnMrFT3EUzsJ4odddobcpQzhUL0tL3q9ljrD8HJUO78rH_Ocmbctadxj7JlxnWerJFX-SZklOYUCYc9RSGfK7YAhxyMQ0ErQg)

![img](https://lh3.googleusercontent.com/u0l4xsICOvo5TFMDLuMhaa6Xa44bmMrFhKBjjlnnMrFT3EUzsJ4odddobcpQzhUL0tL3q9ljrD8HJUO78rH_Ocmbctadxj7JlxnWerJFX-SZklOYUCYc9RSGfK7YAhxyMQ0ErQg)

![img](https://lh4.googleusercontent.com/so1Dazm6AfGA3lVKqbx9mo37Wk11uyN7vUKxeuv4SOU0Xd7fo2eyX4Ep_cCfbdJ_hqzh8lS3m4CqJ5HpExImkIBiuxD_S20aAzbUAYNQSir-fNqfKP3mtrTLWXe-IXx73cLM6Fg)

![img](https://lh3.googleusercontent.com/AUF8fSm4WNjlLDA3uRjIF6J6A8vb60AK3wRxOSxNE6RnUy3nQjkn99g0IYcd1o4qcRA4sjibNArBY0WepyJF0qxnGFygF7olPUvdReumOaBQ0QjZaSVzj1SW-NG_ke-ukg203TI)

<p style="text-align: center;"><b>그림 4: 시간-수평회전축 기울기 그래프</b></p>

### 2-3. 오차 분석

​	본 절은 실험 결과 및 측정에서 발생한 오차에 대하여 다룬다. 오차의 발생 원인을 분석하고, 이러한 오차를 줄이는 개선 방법에 대하여 논의한다.

#### 2-3-1. 장동 운동의 복잡성으로 인한 오차

​	이론적 배경에서 세차 운동의 각속도에 관한 식 $\displaystyle \omega _p = \frac{ mgr }{ I \omega }$은 장동 운동을 고려하지 않고 얻어낸 식이다. 세차 운동은 장동 운동을 유도하고, 그 역 또한 성립하기 때문에, 자이로스코프 운동을 더욱 정확하게 분석하기 위해서는, 각운동량에 대하여 이계 벡터 미분방정식의 해를 구하여야 한다. 이는 다소 많은 배경 지식을 요하기 때문에 많은 어려움이 있다.

​	실험 방법에서 논하였듯이, 회전축을 충분히 빠르게 회전시키면, 장동 운동이 세차 운동에 영향을 미치는 정도를 줄일 수 있다. 장동 운동의 존재는 오차에 영향을 미친다. 그러나, 현실적으로 장동 운동 자체를 없애는 것은 불가능하다.

#### 2-3-2. 관성 바퀴의 질량의 무지로 인한 오차

​	실험 ①에서 이론적 세차 각속도를 계산하기 위해서는, 실험 장치의 여러 부분의 길이, 관성 바퀴의 질량과 크기 등이 필요하다. 그러나, 실험 장치의 복잡한 구조 때문에, 버니어 캘리퍼스로 정밀하게 길이를 측정하는 것이 많이 어렵다. 이러한 문제점은 특히 관성 바퀴의 질량을 측정함에 있어 큰 오차를 야기하였다. 실험 장치에서 관성 바퀴를 분리할 수 없기 때문에, 토크를 이용하여 간접적으로 질량을 측정하여야 한다. 그러나, 길이 측정에서 발생하는 오차와, 추의 질량 및 위치의 오차, 수평을 설정함에 있어 발생하는 오차가 모두 중첩되어, 최종적으로 산출한 관성 바퀴의 질량의 오차는 매우 크다고 생각된다. 실험 장치를 제작하는 측에서 관성 바퀴에 관한 명확한 정보를 제공하지 않는 이상, 이러한 문제는 해결되기 어려울 것이라고 생각한다.

#### 2-3-3. SensorLAB의 한계에 의한 오차

​	데이터 수집을 위하여 사용한 SensorLAB의 한계가 오차를 발생시켰다. 본 프로그램은 0.02초 단위로 데이터를 수집하는데, 더 짧은 간격으로 측정이 이루어진다면 오차 개선이 이루어질 것이다. 또한 Disk RPM의 측정값이 갑자기 감소하는 문제 또한 있었는데, 이는 측정 센서 자체의 한계라고 생각된다.

## 3. 결론

​	본 실험에서는 자이로스코프의 세차 운동과 장동 운동을 토크와 각운동량을 이용하여 파악하였다. 이론값과 실험 측정값은 특정 조건 아래에서 5% 이내의 오차를 가졌다. 여러 가지의 초기 조건을 주었을 때, 장동 운동이 어떻게 달라지는지 관찰하였다. 이론적 분석의 한계, 측정 오차 및 장치의 한계 등을 오차 원인으로 제시하였다.

## 4. 참고 문헌

[1] Halliday. et al, “일반물리학”, 개정10판, John Wiley & Sons, Inc.

[2] 서울대학교 물리학실험 매뉴얼, “실험 1-4. 자이로스코프”. Retrieved 22 May 2020.

# 보고서 원본

* <a href="/downloadable_files/physicslab1/gyroscope_report.docx" download="download">Word (.docx)</a>
* <a href="/downloadable_files/physicslab1/gyroscope_report.pdf" download="download">PDF (.pdf)</a>

