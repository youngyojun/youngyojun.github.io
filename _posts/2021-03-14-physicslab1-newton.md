---
title: "물리학실험1 뉴턴의 사과"
date: 2021-03-14 17:53:51
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

## 뉴턴역학과 중력

### 1. 실험 목적

​	지표면 위의 물체가 아래로 떨어지는 현상은 우리에게 너무나 자연스럽게 느껴진다. 본 실험을 통하여 중력이 가지고 있는 기본적인 규칙을 알아본다. 중력과 부력, 마찰력이 복합적으로 작용하는 물체의 낙하 운동은 등가속도 운동임을 실험적으로 확인하며, 이상적인 환경에서 오직 지구와의 중력만을 고려한다면 자유낙하하는 물체의 가속도는 그 질량과 관계없이 항상 일정한 값을 가짐을 알아본다.

### 2. 배경 지식

#### 2-1. 뉴턴의 제2법칙

​	뉴턴의 운동법칙은 고전역학에서 물체의 운동을 다루는 세 가지 법칙이다. 각각은 관성과 가속도, 작용·반작용에 대하여 다루며, 이번 실험에서는 물체의 가속도에 관한 법칙인 제2법칙을 주로 이용한다.

​	뉴턴의 제2법칙은 물체에 가해지는 알짜 힘은 그 물체의 질량과 가속도의 곱과 같음을 이야기하며, 이를 식으로는 $\displaystyle \overrightarrow{F _\texttt{net}} = \frac{ \mathrm{d} }{ \mathrm{d} t } \left( m \overrightarrow{v} \right) = m \overrightarrow{a} $와 같이 쓸 수 있다.

​	만일 질량 $m$인 물체에 가해지는 힘 $\displaystyle \overrightarrow{F}$가 일정하다면, 뉴턴의 제2법칙에 의하여 $\displaystyle a = \frac{1}{m} \overrightarrow{F}$ 이므로 가속도 $\displaystyle \overrightarrow{a}$가 일정하며, 시간 $t$에서 속도 $\displaystyle v(t) = v_0 + \int_0^t a \mathrm{d} \tau = v_0 + at$과, 시간 $t$까지 이동한 거리 $\displaystyle s(t) = \int_0^t v( \tau ) \mathrm{d} \tau = v_0 t + \frac{1}{2} a t^2$을 알 수 있다.

#### 2-2. 만유인력의 법칙

​	만유인력의 법칙은 모든 질량을 가진 물체들 사이에는 서로 잡아당기는 방향으로 중력이 작용하며 그 크기는 $\displaystyle F = G \frac{m_1 m_2}{r^2}$ 라는 법칙이다. 여기서 $G$는 중력 상수, $m_1$과 $m_2$는 두 물체의 질량, $r$은 두 물체 간의 거리를 의미한다.

​	만유인력의 법칙을 지구와 지표면 상의 물체에 적용하자. 지구의 질량과 반지름을 각각 $M$과 $R$, 지표면 상의 물체의 질량을 $m$라고 하면, 둘 사이에 작용하는 중력의 크기는 $\displaystyle F = G \frac{Mm}{r^2} \approx \left( \frac{GM}{R^2} \right) m$ 이다. $r \approx R$의 근사가 사용되었고, 고로 지구와 지구 위의 물체 간의 중력의 크기는 그 물체의 질량 $m$과 비례하며, 오직 질량 $m$에만 의존적임을 알 수 있다.

​	지구가 반지름 $R$의 구형이며, 물체와 지구 간의 거리를 $R$로 근사하는 등, 많은 이상적인 가정이 적용되었지만, 진행할 이번 낙하실험에서는 중력의 크기가 일정하리라고 충분히 생각할 수 있다. 낙하 과정에서 물체에 일정한 힘이 가해지므로, 뉴턴의 제2법칙에 의하여 물체의 가속도 $\displaystyle a = \frac{F}{m} \approx \frac{ \left( \frac{GM}{R^2} \right) m}{m} = \frac{GM}{R^2} = g$는 물체와 관계없이 항상 일정한 값을 가질 것이다. 여기서 $g$는 중력 가속도를 의미하며, 이 실험에서는 이 값을 측정하여 볼 것이다.

#### 2-3. 아르키메데스의 원리

​	아르키메데스의 원리는 유체 내의 물체가 유체에 잠긴 부피에 해당하는 유체의 무게만큼 힘을 받는다는 원리다. 이때 작용하는 힘을 부력이라고 하며, 부력의 방향은 중력 방향의 반대다.

​	중력 가속도가 $g$일 때, 지구 지표면 위의 물체가 밀도 $\rho$의 유체에 부피 $V$만큼 잠겼을 때 물체에 작용하는 부력의 크기는 $B= \rho Vg$다. 수조 안의 유체에 물체를 넣으면, 물체가 잠기는 부피 $V$만큼 유체가 밀려, 유체 표면이 높아진다. 여기서 기압에 의하여 유체는$\rho V g$만큼의 힘을 물체에 가하며, 물체가 평형 상태를 유지하기 때문에 이는 곧 부력 $B$가 된다.

#### 2-4. 마찰력과 공기저항

​	마찰력이란 하나의 물체가 운동할 때 다른 물체와의 접촉면에서 운동을 방해하는 힘이다. 만일 물체가 공기 중에서 저속으로 떨어지고 있다면, 공기의 점성에 의하여 마찰저항이 발생하며 이를 공기저항이라고 한다.

​	본 실험에서는 물체에 각각 공기와 헬륨을 넣은 풍선을 달아 낙하하는 실험을 진행한다. 이때 부력에 의한 낙하운동을 정확하게 관찰하기 위해서는, 두 풍선의 크기와 모양을 동일하게 하여 풍선에 의한 공기저항을 동일하게 하는 것이 중요하다.

### 3. 실험 방법

​	세 종류의 실험을 진행하며, 각각 ①하나의 물체에 대하여 중력 가속도를 구하고, ②질량에 따라 중력 가속도가 달라지는지 알아보며, ③낙하 시 부력이 작용할 때의 낙하 운동의 변화에 대하여 관찰하는 것이 목표다.

#### 3-1. 낙하 운동 분석

​	본 세부절에서는 물체의 낙하 운동을 분석하는 방법에 대하여 서술한다.

​	먼저 카메라를 컴퓨터에 연결한 후 I-CA 프로그램을 실행하여 연결에 문제가 없는지 확인한다.

​	이후 낙하 운동을 촬영하기 위하여 카메라를 세팅한다. 카메라 렌즈로 인한 왜곡을 줄이고 더 정확한 측정값을 얻기 위하여, 카메라의 수직·수평을 최대한 정확하게 맞춘다. 카메라의 촬영평면은 물체의 낙하면과 일치하도록 조정한다. 카메라의 수직과 수평을 완전히 정확하게 맞출 수 없어도, 추후에 좌표계의 비틀어짐을 세밀하게 보정할 수 있다.

​	움직이는 물체를 선명하게 촬영하기 위하여, 카메라의 밝기, 노출, 초점 조정 등을 모두 자동이 아닌 수동으로 설정한다. 자동으로 설정할 경우, 피사체가 움직이기 때문에 카메라의 촬영 설정이 의도치 않게 바뀌기에, 촬영결과물이 충분하게 선명하지 않을 수 있다. 카메라의 확대 기능 또한 많이 사용하지 않아야 한다.

​	낙하 운동을 촬영할 때에는 반드시 운동면에 기준자가 같이 나오도록 하여야 한다. 이는 영상 상에서 좌표계를 설정하고 길이를 측정하는데 기준이 된다.

​	위와 같은 세팅을 전부 완료하였다면, 떨어지는 물체 촬영을 진행한다. '카메라분석 – 화면캡쳐'에서 저장 경로 지정 이후, 영상을 촬영할 수 있다.

​	촬영한 영상은 I-CA 프로그램에서 그 운동을 분석할 수 있다. '메뉴/분석'에서 영상을 읽어 들인 후, '카메라분석 – 좌표계설정'에서 영상 속 기준자의 눈금을 이용하여 기준길이와 좌표계를 설정한다. '카메라분석 – 분석'에서 시작 프레임과 끝 프레임을 지정하면, 지정된 구간에서 물체의 운동을 분석할 수 있다. 분석 대상은 색상으로써 지정할 수 있으며, 혹여 프로그램이 분석 대상을 자동으로 찾지 못한다면 수동으로 직접 지정할 수 있다.

​	I-CA 프로그램으로 영상 분석을 하였다면, Excel을 이용하여 데이터를 검증하는 작업을 진행한다. 영상 촬영과 데이터 검증을 번갈아 시행하여, 오류 없이 실험이 잘 진행되고 있는지 확인하도록 한다. 또한 같은 실험 과정을 충분히 많이 반복하여, 사람에 의하여 발생하는 오류를 줄이도록 한다.

#### 3-2. 실험 ① 중력 가속도 측정

​	실험 ①에서는 하나의 물체를 낙하하여 중력 가속도를 측정한다. 한 개의 추를 카메라에 담을 수 있는 적당한 높이에서 자유낙하 시킨다. '3-1. 낙하 운동 분석'에 서술된 과정을 따라 낙하하는 추를 촬영한 후, 시간에 따른 추의 위치를 데이터화한다.

​	시간 $t$동안 추가 낙하한 거리를 $s(t)$라 하자. 가속도 $a$가 일정하다면, 뉴턴의 제2법칙에 의하여 $\displaystyle s(t) = \frac{1}{2} a t^2$가 성립한다. $v(t) = at$이므로, $\displaystyle v(t) = \frac{ \mathrm{d} }{ \mathrm{d} t } s(t) \approx \frac{ \Delta s }{ \Delta t }$을 이용하여 시간-속도 그래프가 선형 형태를 가지는지 확인한다. 이후, $\displaystyle a(t) = \frac{ \mathrm{d} }{ \mathrm{d} t } v(t) \approx \frac{ \Delta v }{ \Delta t }$을 이용하여 가속도가 상수 값을 가지는지 확인한다. 이론 상, 가속도는 시간 $t$와 독립적인 상수 값을 가져야 하며, 이 값이 중력 가속도가 된다.

#### 3-3. 실험 ② 질량에 따른 중력 가속도 변화 관찰

​	실험 ②에서는 중력 가속도가 낙하 물체의 질량과 관계가 있는지 그 여부를 확인한다. 실험 ①과 동일한 과정을 한 번 더 진행하되, 낙하 추의 무게를 다른 것을 이용한다.

​	배경 지식의 ‘만유인력의 법칙’에서 언급했듯이, 이론적으로는 추의 무게와 중력 가속도는 관련이 없다. 고로 중력 가속도를 상수 $g$와 같은 형태로 사용할 수 있다.

#### 3-4. 실험 ③ 부력이 작용하는 낙하 운동 관찰

​	실험 ③에서는 부력이 작용할 때 중력 가속도가 어떻게 변화하는지를 관찰한다. 1m 플라스틱 자에 실로 각각 공기가 들어있는 풍선과 헬륨이 들어있는 풍선을 연결하여, '3-1. 낙하 운동 분석'의 과정을 시행한다.

​	풍선이 매달린 물체를 낙하한다면, 이 물체에는 중력과 더불어 부력과 공기저항이 같이 작용한다. 물체와 풍선의 질량을 각각 $m$, $m _\texttt{bln}$, 공기와 풍선에 넣은 기체의 밀도를 각각 $\rho$, $\rho _\texttt{bln}$, 풍선의 부피를 $V$, 낙하 시 공기와의 마찰력을 $F _\texttt{fric}$라 하자. 중력과 부력, 공기저항을 고려할 때, 이 물체에 작용하는 힘은 $F = \left( m + m _\texttt{bln} + \rho _\texttt{bln} V \right) g - \rho V g - F _\texttt{fric} = \left( m + m _\texttt{bln} \right) g - \left( \rho - \rho _\texttt{bln} \right) V g - F _\texttt{fric}$다. $F _\texttt{fric}$의 값을 정확하게 알지 못하기 때문에, 크기와 모양이 똑같으나 내부 기체의 밀도가 다른 두 풍선을 이용하여 실험을 진행한다.

​	공기가 들어있는 풍선으로 낙하 실험을 하였다면, $\rho _\texttt{bln} = \rho$이므로 마찰력 $F _\texttt{fric}$을 알 수 있다. 이후, 헬륨 풍선으로 동일한 실험을 진행하여 물체의 가속도가 $\displaystyle a = \frac{F}{m _\texttt{tot}} < g$로 나오는지 확인한다.

## 4. 실험 장비

​	3절에 서술한 세 종류의 실험을 진행하기 위해서는 다음과 같은 장비가 필요하다. 카메라 및 I-CA 프로그램이 설치된 컴퓨터 1대, 50g과 200g 추 각각 한 개, 1m 플라스틱 자 한 개, 가늘고 튼튼한 실, 칼 한 개, 투명 셀로판 테이프 한 개, 공기를 넣은 풍선 한 개와 헬륨을 넣은 풍선 한 개가 필요하다.

​	무게가 다른 두 개의 추는 3절의 실험 ①과 실험 ②에서 사용한다. 추를 자유낙하할 때 안전과 주변 기기의 파손에 주의하여야 한다.

​	실험 ③에는 플라스틱 자와 실, 두 개의 풍선과 테이프를 모두 사용한다. 두 풍선의 크기와 모양은 최대한 비슷하여야 한다. 자에 실과 테이프를 이용하여 공기 풍선과 헬륨 풍선을 연결할 때, (i) 실과 테이프의 무게가 비슷하여야 하고, (ii) 너무 많은 실과 테이프를 사용하여 그 무게가 너무 무거우면 안된다.

# Prelab 원본

* <a href="/downloadable_files/physicslab1/newton_apple_prelab.docx" download="download">Word (.docx)</a>
* <a href="/downloadable_files/physicslab1/newton_apple_prelab.pdf" download="download">PDF (.pdf)</a>



------

# 보고서

## 뉴턴의 사과 실험

### 중력과 고전역학

#### Abstract

​	본 실험은 뉴턴 역학에서 중력이 가지는 기본적인 규칙에 대하여 알아보았다. 중력, 부력, 공기저항과 마찰력이 복합적으로 작용하는 낙하 운동을 이론적인 수식을 이용하여 예상하였고, 이를 풍선을 매단 추 등을 떨어뜨리는 실험을 통하여 확인하였다. 실험에서는 이론과 다르게 중력 가속도의 값이 크게 계산되는 등 오차가 발생하였다. 이러한 오차의 원인으로 실험 진행자에 의한 부정확성, 공기의 항력, 제어되지 않은 실험 환경 등을 제시하였다.

## 1. 서론

### 1-1. 실험 목적

​	뉴턴은 물체의 운동을 ‘힘’의 개념을 이용하여 설명하였다. 우주에 존재하는 기본적인 힘은 중력, 약력, 전자기력, 강력으로 크게 네 종류로 분류할 수 있다. 일상생활에서 마주할 수 있는 대부분의 운동은 중력과 전자기력으로 설명할 수 있으며, 그만큼 이 두 가지 힘은 우리에게 너무나 친숙하다. 본 실험은 친숙한 두 종류의 힘 중 중력의 기본적인 규칙에 대하여 다룬다. 지표면 부근에서 수직 낙하하는 물체의 운동을 뉴턴의 운동법칙에 근거하여 분석한다. 지표면에 수직하게 낙하하는 독립적인 물체는 등가속도 운동을 함을 보이고자 한다. 또한 중력의 영향만 받아 자유낙하하는 물체의 가속도는 그 물체의 질량과 관계없이 일정한 상수값을 가짐을 보이고자 한다.

### 1-2. 이론적 배경

#### 1-2-1. 중력과 중력 가속도

​	만유인력의 법칙에 의하면, 지표면 부근의 질량이 $m$인 물체와 지구 사이에 작용하는 중력의 크기는 $\displaystyle F=G \frac{mM}{R^2}$고, 이 힘은 서로를 잡아당기는 방향으로 작용한다. 이때 $G$는 중력 상수, $M$과 $R$은 각각 지구의 질량과 반지름을 의미한다.

​	여기서 뉴턴의 제2법칙을 적용하면, 자유 낙하하는 물체는 일정한 가속도 $\displaystyle a=\frac{F}{m}=\frac{GM}{R^2}=g$를 가지는, 등가속도 운동을 함을 알 수 있다. $g$는 중력 가속도로 대략 9.80665㎨의 값을 가지며, 물체의 질량 $m$과 무관한 상수다.

#### 1-2-2. 일정한 힘을 받는 낙하 운동

​	질량 $m$, 초기 속도 $\displaystyle \overrightarrow{v_0}=-v_0 \overrightarrow{j}$인 물체가 지표면방향으로 일정한 힘 $F$를 받으면서 낙하 운동을 한다고 가정하자. 이 물체는 일정한 가속도 $\displaystyle a=\frac{F}{m}$를 가지게 되며, 낙하 시간 $t$에 대하여 속도는 $v(t)=v_0+at$, 낙하 거리는 $\displaystyle s(t)=v_0 t+\frac{1}{2}at^2$다. 따라서 $v_0$가 충분히 작다면 $v_0 t \approx 0$ 근사를 사용하여, $t$-$s$ 그래프는 포물선 형태, $t$-$v$ 그래프와 $t$-$\displaystyle \frac{s}{t}$ 그래프, $\log t$-$\log s$ 그래프는 모두 선형일 것이다.

#### 1-2-3. 부력

​	물체가 유체에 잠겨 있다면, 아르키메데스의 원리에 의하여 물체는 부력을 받게 된다. 물체가 지구 지표면 부근에 있고, 유체의 밀도를 $\rho$, 물체가 잠긴 부피를 $V$라 하면, 부력은 중력 반대 방향으로 $B=\rho Vg$만큼 작용한다.

## 2. 본론

### 2-1. 실험 방법

#### 2-1-1. 실험 ① 중력 가속도 측정

​	먼저 낙하하는 물체를 촬영할 카메라를 세팅한다. 카메라의 수직과 수평을 정확하게 맞추고, 카메라가 촬영하는 평면이 물체의 낙하면과 일치하도록 한다. 밝기와 노출, 초점 조정 등은 모두 수동으로 설정하여, 선명한 결과를 얻을 수 있도록 한다. 이후 기준자를 수직하게 설치한 후, 낙하 운동을 촬영한다.

​	한 개의 추를 적당한 높이에서 떨어뜨리는 과정을 세 번 반복한다. 추를 떨어뜨릴 때 손에 힘을 주지 않도록 유의한다. I-CA 프로그램을 이용하여 시간 $t$동안 추의 낙하 거리 $s(t)$를 측정한다. 이후, $t$-$s(t)$ 그래프를 활용하여 중력 가속도를 계산한다.

#### 2-1-2. 실험 ② 질량에 따른 중력 가속도 비교

​	무게가 다른 두 개의 추를 준비한 후, 각 추에 대하여 실험 ①의 과정을 시행한다. 이후, 비슷한 과정을 거쳐 두 추의 중력 가속도를 구한 후, 그 값을 서로 비교한다.

#### 2-1-3. 실험 ③ 부력이 작용하는 낙하 운동 관찰

​	실험 ①과 ②와는 다르게, 이번에는 추에 풍선을 연결하여 중력과 더불어 공기저항과 부력이 작용할 때의 낙하 운동을 관찰한다.

​	무게가 같은 풍선 두 개에 각각 공기와 헬륨을 넣어 두 풍선의 부피가 동일하도록 한다. 공기 풍선과 추를 실로 연결하여 실험 ①의 과정을 시행한 후, 헬륨 풍선과도 연결하여 똑같은 과정을 반복한다. 낙하할 때 작용하는 공기저항의 크기를 같게 하기 위하여, 두 풍선의 크기와 모양이 동일하여야 한다. 이후, 부력이 낙하 운동의 가속도에 어떠한 영향을 미치는지 확인한다.

### 2-2. 실험 결과 및 데이터

본 실험은 조교님이 진행하였으며, 본 보고서에 쓰인 모든 데이터는 조교님이 측정한 것임을 밝힌다.

#### 2-2-1. 낙하 물체의 물리량

​	총 세 개의 실험에서 질량이 다른 두 개의 추와, 동일한 풍선 두 개를 사용하였다. $e =1 \texttt{g}$인 전자저울로 질량을 측정하였으며, 그 측정값은 **표 1**과 같다.

<p style="text-align: center;"><b>표 1: 낙하 물체의 질량 측정값 ($e=1\texttt{g}$)</b></p>

|      물체       |                질량                |
| :-------------: | :--------------------------------: |
| 추1 (가벼운 추) |       $m_1=25.4 \texttt{g}$        |
| 추2 (무거운 추) |       $m_2=51.9 \texttt{g}$        |
|      풍선       | $m_\texttt{ball} = 3.8 \texttt{g}$ |

#### 2-2-2. 실험 ①의 결과

​	가벼운 추의 자유 낙하 운동을 촬영하여, 시간에 따른 낙하 거리 $s(t)$를 구하였다. 이론적으로는 $\displaystyle s(t)=v_0 t+\frac{1}{2}gt^2$ 이므로, $t$-$s(t)$ 그래프는 원점을 지나는 이차함수 형태를 가지며, 이차항의 계수를 두 배 하여 중력 가속도 $g$를 구할 수 있다. **그림 1**은 실제로도 $t$-$s$ 그래프가 이차 다항식 추세선과 거의 일치함($R^2=1$)을 보여준다.

​	추의 평균 속도와 순간 속도를 통해서도 중력 가속도를 구할 수 있다. 평균 속도 $v _\texttt{mean}$는 $\displaystyle v _\texttt{mean}=\frac{s(t)}{t}=v_0+\frac{1}{2}gt$, 순간 속도 $v$는 $\displaystyle v=\frac{\mathrm{d}s}{\mathrm{d}t}=v_0+gt$ 이므로, $t$-$v _\texttt{mean}$ 그래프와 $t$-$v$ 그래프 모두 선형 형태를 띄며, 일차항의 계수를 이용하여 $g$의 값을 계산할 수 있다. **그림 2**와 그림 3은 실제로도 위 두 그래프가 일차 추세선과 매우 유사함($R^2≅0.999$)을 보여준다.

​	**표 2**는 세 그래프의 추세선의 식을 이용하여 각각 중력 가속도와 오차율을 계산한 결과를 보여준다. 세 번의 실험 모두 중력 가속도가 $g \approx $9.80665㎨보다 크게 나왔다. 또한 $t$-$v_\texttt{mean}$ 그래프의 추세선을 이용하여 계산한 값은 다른 두 방법에 비하여 오차가 더 크다. 이러한 결과의 원인에 대해서는 3절에서 다룬다.

![img](https://lh6.googleusercontent.com/pvSVVEfZc4t0AAgbxNVsir4kvb8IycpR-5LHe5owUrCa2jSxy8spJHycRcF4YPaPHKaIrHzRjhTiN51ONC6ODtgv4aEXzvFjstA_pHx8RYqaePkKsg5kdmAyPpDMMek4TaUQf5Q)

<p style="text-align: center;"><b>그림 1: 추1 낙하 운동의 시간-이동거리 그래프</b></p>

<p style="text-align: center;">세 번의 실험 결과의 그래프가 모두 포물선의 형태를 가진다($R^2=1$).</p>



![img](https://lh5.googleusercontent.com/WX2lcINBVlgfa5XcgiTabT1LKPwBum8pmwR_14p3acF_8r-l1R1MmEMquJShsAIo8t5SHrkyz1g4KOtr13UOud09MdpPmVS7-LOmZD7YbJ2AA9BwjDH_8Sj2E9EXGaQ1kHaAmGk)

<p style="text-align: center;"><b>그림 2: 추1 낙하 운동의 시간-평균속도 그래프</b></p>

<p style="text-align: center;">$R^2 \ge 0.9989$로 선형의 추세선과 강한 상관관계가 있음을 확인할 수 있다.</p>



![img](https://lh5.googleusercontent.com/eiqjZHw4W6XgFsfvbx1WNV4p6iWz224Ug7fYOS1hr5AouFJRsXEJZSe-kO-rgADDr3R2slIrlfJmGvmp0SgPeBGx_GIBM3WxIt8WCEuIAa89tIu0S_rC_rfCOrC9KHLvsrxkWEE)

<p style="text-align: center;"><b>그림 3: 추1 낙하 운동의 시간-순간속도 그래프</b></p>

<p style="text-align: center;">$\displaystyle v=\frac{\mathrm{d}s}{\mathrm{d}t} \approx \frac{\Delta s}{\Delta t}$로 근사하여 순간속도 $v$를 계산하였다. $R^2 \ge 0.997$의 높은 결정계수를 가지나, 중간중간 추세선과 크게 차이나는 값들이 관찰된다.</p>



<p style="text-align: center;"><b>표 2: 세 가지 방법으로 계산한 세 실험의 중력 가속도(㎨) 및 오차율(%)</b></p>

|      |       $t$-$s$       | $t$-$v_\texttt{mean}$ |      $t$-$v$       |        평균        |
| :--: | :-----------------: | :-------------------: | :----------------: | :----------------: |
| 1차  | 10.6602<br />8.70%  |  10.7224<br />9.34%   | 10.629<br />8.39%  | 10.671<br />8.81%  |
| 2차  | 10.8148<br />10.28% |  10.8570<br />10.71%  | 10.889<br />11.04% | 10.854<br />10.68% |
| 3차  | 10.8708<br />10.85% |  11.1176<br />13.37%  | 10.907<br />11.22% | 10.965<br />11.81% |



#### 2-2-3. 실험 ②의 결과

​	**그림 4**는 시간에 따른 추1과 추2의 낙하거리의 변화를 보여준다. 이 그래프의 추세선의 식을 이용하여 중력 가속도를 각각 계산하였다. 추1은 10.4642㎨, 추2는 10.7333㎨의 가속도를 가졌고, 이 두 값은 (10.6±0.14)㎨로 유사함을 확인하였다. 여기서 추2의 3차 실험은 중력 가속도가 너무 작게 나와(<7.5㎨) 분석을 할 수 없기 때문에, 계산에서는 제외하였다.

![img](https://lh4.googleusercontent.com/4NkEASsgco9MhWwcA5urcMWjh1Hct8w5i9rdR0vtgQVNt36rLzZvWl0AAMLsQb7b67K4uFwAODaw3jL-lU97ba1U7iG_QD1sytVuBB6CBmDt1H-J-BAK-bgH83CZgCqNmHvUXjU)

<p style="text-align: center;"><b>그림 4: 추1과 추2의 시간-이동거리 그래프</b></p>



#### 2-2-4. 실험 ③의 결과

​	**그림 5**는 추2를 매단 두 풍선의 이동거리가 시간에 따라 어떻게 변화하는 지를 보여준다. 공기 풍선의 낙하 시 가속도는 $a _\texttt{air} = 8.9839㎨$, 헬륨 풍선의 가속도는 $a _\texttt{helium} = 8.3535㎨$임을 확인하였다. 공기저항의 크기는 $F _\texttt{resistance} = \left( m_2+m _\texttt{ball} \right) \left( g - a _\texttt{air} \right) - \rho _\texttt{air} V _\texttt{ball} a _\texttt{air}$다. 헬륨 풍선 실험에서 부력을 고려한다면, $\displaystyle V _\texttt{ball} = \frac{ \left( m _2 + m _\texttt{ball} \right) \left( a _\texttt{air} - a _\texttt{helium} \right) }{ \left( \rho _\texttt{air} - \rho _\texttt{helium} \right) g + \rho _\texttt{helium} a _\texttt{helium} - \rho _\texttt{air} a _\texttt{air} } \approx 0.04828㎥$로 실제보다 약간 더 큰 값을 얻을 수 있었다.

![img](https://lh4.googleusercontent.com/rvI3OdvNZdtPZmjDibb3jjoUzc7Ixz5o-b_PFoGzI_2yg9RIdzwCTcCS3H5kGKQKL-0N-_BvOCUBzGk5-enWVyUepaZFbQoNZVBFArkiHaYeAhISRTv0K82vudwLh-sqliZ56RI)

<p style="text-align: center;"><b>그림 5: 추2와 연결된 두 풍선의 시간-이동거리 그래프</b></p>



### 2-3. 오차 분석

​	본 절에서는 실험 결과 데이터에서 발생한 오차에 대하여 다룬다. 오차의 발생 원인을 분석하고, 이러한 오차를 줄이는 방법과 개선 방안에 대하여 논의한다.

#### 2-3-1. I-CA 프로그램 사용에 의한 오차

​	I-CA 프로그램은 영상 속 물체의 길이를 기준 길이와 비교하여 측정하며, 이러한 기준 길이는 사용자가 기준자의 눈금을 직접 입력하여 설정한다. 만일 기준 길이를 실제 길이보다 짧게 설정하였다면, I-CA 프로그램은 낙하 거리를 실제보다 길게 계산할 것이며, 실험 데이터와 같이 중력 가속도를 더 크게 측정하게 된다. 기준 길이 설정에서 발생하는 오차율은 그대로 중력 가속도 오차율에 반영되므로, 이러한 설정에서 발생하는 오차를 줄이는 것만으로도 실험 데이터의 오차를 줄이는 데 도움이 될 것이다. 촬영용 카메라의 화질을 개선하거나, 기준 길이를 설정할 때, 화면을 최대한 확대하여 기준자 눈금을 명확하게 확인함으로써 해결할 수 있다.

​	또한, I-CA 프로그램이 낙하하는 추를 추적하는 과정에서 오차가 발생하였을 수 있다. 일반적으로 I-CA 프로그램은 물체를 색으로 구별하여 추적한다. 이때, 물체가 낙하하면서 다양한 각도에서 빛을 받아 일부분의 색이 바뀔 수 있다. 이 경우, 프로그램은 물체의 일정 부분을 계속 추적하지 못하고, 진동하는 형태로 추적할 것이다. 이로부터 시간에 따른 이동거리에 오차가 발생하였을 수 있으며, 이는 곧 $\displaystyle \frac{ \Delta s }{ \Delta t }$ 값이 진동하게 만들어, 순간속도 그래프가 중간중간 이상한 값을 가지게 만들 수 있다. 이러한 현상은, 물체의 촬영면이 너무 넓을 때에도 발생할 수 있다. 이 문제는 추에 작고 색이 주변과 크게 대비되는 스티커를 붙임으로써 해결할 수 있다.

#### 2-3-2. 촬영의 흔들림으로 인한 오차

​	실험 중에 카메라를 조작하면서 발생하는 진동은, 촬영면의 좌표계에 진동을 주어 오차를 발생한다. 특히 추의 낙하가 아주 빠르게 일어나기 때문에, 낙하하는 추를 촬영할 때에 카메라가 상하로 흔들린다면, I-CA 프로그램은 추의 낙하 거리를 실제보다 더 크게, 혹은 더 작게 측정할 것이다. 이러한 문제는 카메라를 더욱 견고하게 고정하고, 별도의 컨트롤러로 카메라를 조작함으로써 해결할 수 있다.

#### 2-3-3. 공기에 의한 항력

​	공기는 유체이고, 유체는 내부에서 움직이는 물체에 저항하려는 특징이 있기 때문에, 공기 안에서 낙하하는 추는 운동을 방해받는 항력을 받게 된다. 항력 방정식에 의하여, 추는 $\displaystyle F _d = \frac{1}{2} \rho _\texttt{air} v^2 A _\texttt{bottom} C _d$ 크기의 항력을 받으며, $v=4㎧$, $A _\texttt{bottom}=0.0152㎡$로 계산하면 $F_d < 0.007 \texttt{N}$다[1]. 이는 추1에 약 0.276㎨의 가속도 변화를 일으키는 힘이다. 이 오차는 항력의 크기를 정확하게 계산하여 실험에 반영하거나, 혹은 진공 상태에서 실험을 진행함으로써 해결할 수 있다.

#### 2-3-4. 이상적인 이론과 다른 실험 환경

​	실험 ③에서 풍선 내부의 기체 부피가 실제보다 크게 나온 이유에 대하여 분석한다. 먼저 공기 풍선과 헬륨 풍선의 부피가 일치하지 않았을 수 있다. 이 경우, 풍선의 모양과 표면적 또한 달라지게 되므로, 두 풍선에 작용하는 공기저항 또한 다르게 될 것이다. 수식에서는 이러한 이상적인 상황을 모두 가정하였기 때문에, 이 부분에서 오차가 발생하였을 수 있다.

​	또는 식에 대입한 기체의 밀도가 틀렸을 수 있다. 수식에서 사용한 기체의 밀도는 SATP를 가정하여 사용하였지만, 실험 환경이 SATP가 아니었을 가능성이 휠씬 크다. 기체는 압력과 온도에 따라 아주 민감하게 밀도가 변화하기 때문에, 실험 결과에 충분한 오차를 불러 일으켰을 것이다[2]. 이러한 오차는 온도와 압력 등을 정밀하게 조절할 수 있는 환경에서 실험을 진행함으로써 해결할 수 있다.

## 3. 결론

​	본 실험에서는 서로 다른 무게의 추를 자유 낙하함으로써 물체에 작용하는 중력에 대하여 알아보았다. 중력의 크기는 물체의 질량에 비례하기 때문에, 뉴턴의 제2법칙에 의하여 중력 가속도는 항상 일정한 값을 가짐을 확인하였다. 뿐만 아니라, 다양한 밀도의 기체가 든 풍선과 추를 연결하여 낙하 운동을 관찰함으로써, 중력과 더불어 마찰력과 공기저항, 부력 등이 동시에 작용하는 운동에 대해서도 분석할 수 있었다.

​	실험의 측정값은 이론과 정확하게 일치하지 않았다. 자유 낙하하는 추의 중력 가속도는 실제보다 크게 측정되었고, 부력을 확인하는 실험에서는 풍선의 부피가 다소 크게 계산되었다. 이러한 오차의 원인은 실험 진행자에 의한 의도치 않은 떨림과 부정확성, 공기의 항력, 제어되지 않은 실험 환경 등이 있다. 다소 어렵기는 하지만 명확한 오차 해결 방법이 있으므로, 이를 보정하여 더욱 정확한 실험을 진행할 수 있을 것으로 기대된다.

## 4. 참고 문헌

[1] Halliday. et al, “일반물리학”, 개정10판, John Wiley & Sons, Inc. p.149.

[2] 동책. p.446.



# 보고서 원본

* <a href="/downloadable_files/physicslab1/newton_apple_report.docx" download="download">Word (.docx)</a>
* <a href="/downloadable_files/physicslab1/newton_apple_report.pdf" download="download">PDF (.pdf)</a>

