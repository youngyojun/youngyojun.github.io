---
title: "물리학실험1 당구의 역학"
date: 2021-04-02 15:42:43
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

## 탄성 충돌과 운동량 보존 법칙

### 1. 실험 목적

​	당구에서 흰 공을 가만히 있는 빨간 공과 충돌시키면, 두 공이 서로 나란한 방향으로 가지 않고 양 옆으로 퍼지는 현상을 관찰할 수 있다. 두 공 사이에 작용한 힘의 방향을 생각하면, 이는 다소 설명하기 어려운 현상이다. 그러나, 운동량 보존 법칙은 이러한 현상을 물리학적으로 설명할 수 있게 해준다. 본 실험은 테이블 위에서 두 원판을 충돌시켜, 운동량 보존 법칙을 실험적으로 확인할 것이다. 또한 운동량 보존 법칙을 적용하여, 미지 원판의 질량을 알아내고, 탄성 충돌과 비탄성 충돌의 차이점에 대하여 알아볼 것이다.

### 2. 배경 지식

#### 2-1. 운동량 보존 법칙

​	물체의 운동량은 물체의 질량과 속도를 곱한 벡터다. 운동량 보존 법칙은, 두 물체가 서로 충돌한다면, 그 충돌의 종류에 관계없이, 각 물체의 운동량의 합은 보존됨을 설명한다. 이 법칙은 에너지 보존 법칙의 따름정리다.

#### 2-2. 탄성 충돌 및 비탄성 충돌

​	두 물체가 충돌할 때

$$ f = \frac{ \text{(충돌 후 계의 운동 에너지 총량)} }{ \text{(충돌 전 계의 운동 에너지 총량)} } $$

의 값은 항상 1 이하다. 이때, $f=1$라면 이러한 충돌을 ‘탄성 충돌’이라고 하며, $f<1$인 경우는 ‘비탄성 충돌’이라고 한다.

#### 2-3. 반발 계수

​	두 물체가 서로 충돌할 때, 충돌 전후의 속도의 비율을 반발 계수라고 한다. 즉, 두 물체 $A$, $B$의 충돌 직전 속도를 각각 $v_A$, $v_B$, 충돌 직후의 속도를 $v_A'$, $v_B'$라고 한다면, 반발 계수는

$$ e = \frac{ v_B' - v_A' }{ v_A - v_B } $$

로 정의한다. 반발 계수 $e$는 항상 $0 \le e \le 1$이며, $e=1$인 충돌을 ‘완전 탄성 충돌’, $e=0$인 충돌을 ‘완전 비탄성 충돌’이라고 한다. 역학적 에너지를 생성하는 충돌에서는 $e>1$일 수 있으나, 본 실험에서는 이러한 경우를 배제할 것이다.

#### 2-4. 완전 탄성 충돌

​	**그림 1**과 같이 두 물체가 완전 탄성 충돌을 하는 상황을 가정하자. 운동량 보존 법칙과 완전 탄성 충돌의 정의에 의하여, 다음 세 개의 등식을 세울 수 있다.

$$ m_1 u_1 \cos \alpha_1 + m_2 u_2 \cos \alpha_2 = m_1 v_1 \cos \beta_1 + m_2 v_2 \cos \beta_2 $$

$$ - m_1 u_1 \sin \alpha_1 + m_2 u_2 \sin \alpha_2 = m_1 v_1 \sin \beta_1 - m_2 v_2 \sin \beta_2 $$

$$ \frac{1}{2} m_1 u_1^2 + \frac{1}{2} m_2 u_2^2 = \frac{1}{2} m_1 v_1^2 + \frac{1}{2} m_2 v_2^2 $$

위 세 개의 식을 연립하여, 알지 못하는 물리량을 수치적으로 계산할 수 있다. 특히, $m_1 = m_2$고 $u_2 = 0$인 경우에는 충돌 후 각도의 합이 $\displaystyle \beta_1 + \beta_2 = \frac{\pi}{2}$가 됨을 증명할 수 있다.

![img](https://lh3.googleusercontent.com/pN8ICty5HYzAlAEqgKI-ohfA4oOwGs0bgRsMnckf6de6uZK509QfyRKmB6zfJCnYsRp1jXG-jvrtZbXAngJdnYnbxS2dzcvSWEP2OHqoqIrcqZbEglMunXvs_aeecFV1uvek2ng)

<p style="text-align: center;"><b>그림 1: 두 물체의 충돌 모식도</b></p>

### 3. 실험 방법

​	세 종류의 실험을 진행하며, 각각 ①운동량 보존 법칙을 확인하고, ②충돌을 이용한 미지 원판의 질량을 측정하며, ③실험 장치의 철선의 탄성 계수를 계산하는 것이 목표다.

#### 3-1. 실험 ① 운동량 보존 법칙 확인

​	실험 ①에서는 두 원판을 충돌시켜 운동량 보존 법칙이 성립하는지 여부를 확인한다. 공기 테이블 위에 두 개의 원판을 올려놓고, 하나의 원판을 움직여 다른 원판과 충돌하는 과정을 영상으로 기록한다. 촬영한 영상을 I-CA 프로그램으로 분석하여 각 원판의 속도와 충돌 각도, 운동량 등을 계산한다.

​	이외에도 두 원판을 동시에 움직이는 등, 다양한 초기 조건을 주어, 위의 과정을 반복한다.

#### 3-2. 실험 ② 충돌을 이용한 미지 원판의 질량 측정

​	실험 ②에서는 질량을 모르는 미지 원판을 이미 질량을 알고 있는 원판과 충돌시켜, 미지 원판의 질량을 예상한다. 실험 ①과 동일한 과정을 진행하며, 운동량 보존 법칙 하의 2-4절의 등식을 이용하여, 미지 원판의 질량을 수치적으로 계산한다. 이후, 전자 저울을 이용하여 미지 원판의 질량을 측정한 후, 예상한 값과 비교한다.

#### 3-3. 실험 ③ 실험 장치의 철선의 탄성 계수 측정

​	실험 ③에서는 공기 테이블 테두리의 철선의 탄성 계수를 측정한다. 원판을 철선에 충돌시키는 과정을 촬영한 후, 이를 I-CA 프로그램으로 분석하여, 충돌 전후의 속도를 계산한다. 얻은 데이터를 바탕으로 하여 철선의 탄성 계수를 정량적으로 분석한다. 다양한 초기 조건을 주어 위의 과정을 반복한다.

### 4. 실험 장비

​	3절에 서술한 세 종류의 실험을 진행하기 위하여, 다음의 장비가 필요하다. 카메라 및 I-CA 프로그램이 설치된 컴퓨터, 공기 테이블, 다양한 질량의 원판, 1m 자, 전자 저울, 버니어 캘리퍼스, 수평기가 필요하다.

​	세 실험 모두, 원판을 움직일 때 회전을 주지 않도록 하여야 한다. 만일 원판이 충돌 전에 회전 운동을 한다면, 원판의 이동 속도만으로 운동 에너지를 계산할 수 없기 때문이다.

​	공기 테이블을 사용할 때에는 항상 공기 테이블 면이 수평한지 확인하여야 한다. 만일 공기 테이블이 기울어져 있다면, 중력이 완전하게 상쇄되지 않아, 원판의 운동에 영향을 줄 수 있다.

​	원판을 강하게 충돌시켜 실험 장비를 파손하거나, 사람을 맞추는 일이 일어나지 않도록 유의한다. 너무 무거운 원판은 충돌 시 장비의 파손을 유발할 수 있고, 너무 가벼운 원판은 충돌 이후 밖으로 날라갈 수 있다. 또한, 공기 테이블의 공기 압력이 너무 세거나 약하지 않은 지 사전에 확인하여, 안전 사고를 예방한다.

# Prelab 원본

* <a href="/downloadable_files/physicslab1/billiards_prelab.docx" download="download">Word (.docx)</a>
* <a href="/downloadable_files/physicslab1/billiards_prelab.pdf" download="download">PDF (.pdf)</a>



------

# 보고서

## 당구의 역학 실험

### 운동량 보존 법칙과 탄성 충돌

#### Abstract

​	본 실험은 물체 간의 충돌을 이용하여 운동량 보존 법칙을 검증하고 특정한 물체의 탄성 계수를 측정하였다. 공기 테이블 위에서 두 원판이 충돌하는 상황을 이론적 수식을 이용하여 예상하였고, 이를 직접 실행함으로써 정량적으로 확인하였다. 또한 원판과 철선을 충돌시켜 그 운동 에너지를 분석함으로써 철선의 탄성 계수를 측정하였다. 이론과 다르게 실험에서는 운동량이 작아지거나 탄성 계수가 1보다 커지는 등의 오차가 발생하였다. 이러한 오차의 원인으로 원판의 회전 운동, 공기와 원판 간 마찰력, 실험 진행자 및 실험 장치의 정밀도 한계 등을 제시하였다.

## 1. 서론

### 1-1. 실험 목적

​	당구에서 흰 공을 쳐서 정지해 있는 빨간 공과 비스듬하게 충돌시키면, 두 공이 양 옆으로 퍼져 나가는 것을 관찰할 수 있다. 이렇듯, 흰 공에는 전진 방향의 힘만 작용하였는데, 충돌 이후에 두 공이 옆으로 퍼지는 현상은 운동량 보존 법칙으로 설명할 수 있다. 본 실험은 평면 위의 두 물체가 충돌할 때 일어나는 물리 현상을 분석한다. 두 원판을 테이블 위에서 충돌시켜 운동량 보존 법칙을 검증하고, 이를 적용하여 미지 원판의 질량을 정량적으로 알아낸다.

### 1-2. 이론적 배경

#### 1-2-1. 운동량 보존 법칙

​	질량이 $m$인 물체가 $\overrightarrow{v}$의 속도로 운동한다면, 이 물체의 운동량을 $m \overrightarrow{v}$로 정의한다. 물체 $i$가 물체 $j$에 가한 힘을 $\displaystyle \overrightarrow{F} _{j i}$라고 하면, 뉴턴 운동 법칙의 제2법칙과 제3법칙에 의하여

$$ \sum _i m _i \overrightarrow{a} _i = \sum _i \left( \overrightarrow{F} _{i, \text{ext}} + \sum _j \overrightarrow{F} _{i j} \right) = \overrightarrow{F} _\text{ext} $$

가 성립한다. 따라서 외력이 작용하지 않으면, $\displaystyle \sum _i m _i \overrightarrow{a} _i = \overrightarrow{F} _\text{ext} = \mathbf{O}$를 얻고, $\displaystyle \sum _i m _i \overrightarrow{v} _i$가 항상 일정함을 알 수 있다. 이렇듯 여러 개의 물체가 충돌할 때 운동량의 총합은 보존되며, 이를 운동량 보존 법칙이라고 한다.[1]

#### 1-2-2. 탄성 충돌

​	여러 물체가 충돌할 때, 충돌 전후의 계의 운동 에너지의 총합이 보존되면, 이를 탄성 충돌이라고 한다. 탄성 충돌이 아닌, 운동 에너지가 감소하는 경우는 비탄성 충돌이라고 한다.

#### 1-2-3. 충돌의 반발 계수

​	충돌하는 두 물체의 충돌 전후 속도의 비율을 반발 계수라고 한다. 두 개의 물체 $A$, $B$가 충돌 전 속도 $v _A$, $v _B$, 충돌 후 속도 $v _A'$, $v _B'$를 가진다면, 반발 계수는

$$ e = \frac{ v _B' - v _A' }{ v _A - v _B } $$

로 정의한다. 일반적인 충돌에서 $0 \le e \le 1$이며, $e=1$인 충돌은 완전 탄성 충돌, $e=0$인 충돌은 완전 비탄성 충돌이라고 한다. 충돌 과정에서 역학적 에너지가 생성된다면 $e>1$가 가능하나, 이는 아주 특별한 경우이기에 본 실험에서는 고려하지 않았다.[2]

#### 1-2-4. 실험 장치에서 두 원판의 충돌

​	본 실험은 수평한 공기 테이블 위에서 두 원판을 충돌시킴으로써 그의 운동을 관찰한다. 이때 하나의 원판은 정지해 있고, 등속도 운동을 하는 다른 원판과 부딪히면서 충돌을 발생시킨다. 중력은 공기 테이블에 의해 상쇄되므로, 운동을 이차원적으로 분석해도 충분하다.

​	그림 1의 충돌 상황을 가정하자. 운동량 보존 법칙이 성립한다면, $m _2 \overrightarrow{v} _0 = m _1 \overrightarrow{v} _1 + m _2 \overrightarrow{v} _2$다. 여기서 질량비 $\displaystyle \frac{m _2}{m _1} = \frac{ v _1 }{ v _0 - v _2 }$를 얻는다.

​	추가적으로 완전 탄성 충돌이라면, $m _2 v _0^2 = m _1 v _1^2 + m _2 v _2^2$가 성립한다. 위의 식과 연립하면

$$ \frac{ m _2 }{ m _1 } = \frac{ \sin^2 \left( \theta _2 - \theta _1 \right) - \sin^2 \theta _1 }{ \sin^2 \theta _2 } $$

임을 얻는다.[부록 1] 여기서 $m _1 = m _2$라면 $\displaystyle \left\lvert \theta _1 \right\rvert + \left\lvert \theta _2 \right\rvert = \frac{\pi}{2}$가 성립함이 알려져 있다.

![img](https://lh3.googleusercontent.com/lHccGl02UNYS72dvd2PVmt9jXIQ4Wj4JFfaK27lN6x6Bv0p_SbjJjROcma3jchgdjaLOKIS71IIhWvIiPH6dJ83RDacopTO3fju-jSfjMB1MLdkKTGbIM4GPYQVZLEbPV3xGzTM)

<p style="text-align: center;"><b>그림 1: 두 원판의 충돌 모식도</b></p>



![img](https://lh6.googleusercontent.com/qg2gVRCsQL1gf-0kLjRtuP0IJbvE6qM1gg5rPY6epzYo6gGip5GtAs-u-_CVT28xEdxB0tTifanqic2La2qeA_C1Mjpig5JPyxPfyD-MGthaqhW-4W2zZiTFVkotgR7tdm025qk)

<p style="text-align: center;"><b>그림 2: 원판과 벽의 충돌 모식도</b></p>

#### 1-2-5. 실험 장치에서 원판과 벽의 충돌

​	**그림 2**와 같이, 원판이 벽과 충돌하여 튕겨져 나오는 상황을 가정하자. 벽이 탄성 계수 $f$를 가진다면, $\displaystyle f = \left( \frac{v}{v _0} \right)^2 $다. 또한 속도의 $y$축 성분은 유지되므로 $ v _0 \sin \theta _0 = v \sin \theta $에서, $\displaystyle f = \left( \frac{ \sin \theta _0 }{ \sin \theta } \right)^2 $ 또한 얻을 수 있다.

## 2. 본론

### 2-1. 실험 방법

#### 2-1-1. 물리량 측정

​	1m 자와 버니어 캘리퍼스, e=1g의 전자 저울을 이용하여, 10g 및 15g 추와 원판의 질량 및 크기, 공기 테이블의 크기를 측정한다.

#### 2-1-2. 실험 ① 운동량 보존 법칙 검증

​	두 개의 원판을 공기 테이블 위에서 충돌시켜, 운동량 보존 법칙이 성립하는지 확인한다. 수평하게 설치된 카메라로 충돌 과정을 녹화하고, 이를 I-CA 프로그램으로 분석하여, **그림 1**의 $\overrightarrow{v} _i$의 값을 구한다. $ m _2 \overrightarrow{v} _0 = m _1 \overrightarrow{v} _1 + m _2 \overrightarrow{v} _2$의 성립 여부로 운동량 보존 법칙을 검증한다.

#### 2-1-3. 실험 ② 충돌을 이용한 미지 원판 질량 측정

​	빨간 원판과 초록 원판 각각에 10g 추나 15g 추를 무작위로 넣은 후, 실험 ①의 과정을 진행하여, 각 원판에 어떤 추가 들어있는지를 정량적으로 알아낸다. 추를 무작위하게 넣는 작업을 세 번 진행하고, 각 작업에 대하여 실험 ①의 과정을 세 번씩 반복한다.

#### 2-1-4. 실험 ③ 실험 장치의 철선의 탄성 계수 측정

​	공기 테이블의 테두리의 철선에 원판을 충돌시켜, 이의 탄성 계수를 측정한다. 원판을 밀어 철선과 충돌시키는 작업을 세 번 반복하고, 각각에 대하여 **그림 2**의 $\overrightarrow{v} _i$와 $\theta _i$의 값을 측정한다. 측정한 값을 바탕으로, 이론적 배경 1-2-5절의 식을 이용하여 탄성 계수를 계산한다.

### 2-2. 실험 결과 및 데이터

​	본 실험은 모두 조교님이 진행하였고, 본 보고서에 쓰인 데이터 또한 모두 조교님이 측정한 것임을 밝힌다.

#### 2-2-1. 실험 장치 및 원판, 추의 물리량

​	공기 테이블은 가로 $w = 48 \text{cm}$, 세로 $h = 57 \text{cm}$의 크기를 가졌다. 두 원판 모두 반지름 $r=3.5 \text{cm}$, 질량 $m=46.4\text{g}$을 가졌다. 10g 추와 15g 추의 질량은 각각 $m_{10\text{g}} = 10.2 \text{g}$, $m _{15\text{g}} = 15.0\text{g}$다.

#### 2-2-2. 실험 ①의 결과

​	질량이 m으로 동일한 두 원판으로 실험을 진행하였다. 초록 원판을 손으로 밀어, 정지 상태의 빨간 원판을 가격하는 과정을 총 3회 진행하였다. 표 1은 3회의 과정에서 두 원판의 충돌 전과 후의 운동량을 보여준다. 세 번 모두 충돌 전후의 운동량의 차이는 5% 이내의 오차율을 가졌고, 1차를 제외하면 충돌 전의 운동량이 충돌 후의 운동량보다 더 큰 값을 가졌다. 이러한 결과가 나온 이유에 대해서는 2-3절에서 다룬다.

​	추가적으로, 원판의 충돌이 완전 탄성 충돌인지를 확인하기 위하여, 충돌 전후의 운동 에너지와 충돌 후 두 원판이 퍼지는 각도를 측정하였다. 그 측정값은 표 2와 같다. 세 번 모두 운동 에너지는 감소하였고, 감소율은 적게는 6%에서 많게는 27%까지 큰 폭을 보였다. 충돌 이후 두 원판은 70° 이상 벌어지지 않았다. 이러한 결과로 미루어볼 때, 충돌 과정에서 운동 에너지는 보존되지 않았다고 할 수 있다.

<p style="text-align: center;"><b>표 1: 두 원판의 충돌 전후 운동량, 증감 및 오차율</b></p>

|      |         충돌         |                          운동량 합                           |  오차  |
| :--: | :------------------: | :----------------------------------------------------------: | :----: |
| 1차  | 전<br />후<br />증감 | $ -4.9915 \times 10^{-2} \mathbf{i} + 3.9838 \times 10^{-3} \mathbf{j}$<br />$-5.2345 \times 10^{-2} \mathbf{i} + 3.1721 \times 10^{-3} \mathbf{j}$<br />$ 2.3678 \times 10^{-3} \text{N} \cdot \text{s}$ | 5.117% |
| 2차  | 전<br />후<br />증감 | $ -5.2988 \times 10^{-2} \mathbf{i} -1.5148 \times 10^{-5} \mathbf{j}$<br />$-5.2517 \times 10^{-2} \mathbf{i} -1.7878 \times 10^{-5} \mathbf{j}$<br />$ -4.4066 \times 10^{-4} \text{N} \cdot \text{s}$ | 3.461% |
| 3차  | 전<br />후<br />증감 | $ -6.3763 \times 10^{-2} \mathbf{i} -9.5331 \times 10^{-3} \mathbf{j}$<br />$ -6.3112 \times 10^{-2} \mathbf{i} -9.1052 \times 10^{-3} \mathbf{j}$<br />$ -7.0099 \times 10^{-4} \text{N} \cdot \text{s}$ | 1.201% |



<p style="text-align: center;"><b>표 2: 두 원판의 충돌 전후 운동 에너지, 증감률 및 사잇각</b></p>

|      |    충돌    |                         운동 에너지                          | 증감률  |  각도  |
| :--: | :--------: | :----------------------------------------------------------: | :-----: | :----: |
| 1차  | 전<br />후 | $2.7040 \times 10^{-2} \text{J}$<br />$2.5217 \times 10^{-2} \text{J}$ | -6.742% | 50.26° |
| 2차  | 전<br />후 | $2.9104 \times 10^{-2} \text{J}$<br />$2.4512 \times 10^{-2} \text{J}$ | -15.78% | 66.91° |
| 3차  | 전<br />후 | $4.3963 \times 10^{-2} \text{J}$<br />$3.2023 \times 10^{-2} \text{J}$ | -27.16% | 61.86° |

#### 2-2-3. 실험 ②의 결과

​	그림 1의 충돌 상황에서 두 원판의 질량비 $\displaystyle r = \frac{m _2}{m _1}$를 계산하기 위하여, 총 세 가지 방법으로 시도하였다.

​	먼저, 운동량 보존 법칙 $m _2 v _0 = m _1 v _1 + m _2 v _2$을 이용하여 $\displaystyle r = \frac{ v _1 }{ v _0 - v _2 }$로 계산하였다. (방법 1)

​	운동량 보존 법칙을 벡터 식 $ r \overrightarrow{v} _0 = \overrightarrow{v} _1 + r \overrightarrow{v} _2 $로 생각하여 $ \displaystyle \left\lVert \overrightarrow{v} _1 + r \left( \overrightarrow{v} _2 - \overrightarrow{v} _0 \right) \right\rVert$가 최소가 되는 $r$을 계산하였다. (방법 2) [부록 2]

​	마지막으로, 여기에 완전 탄성 충돌이라는 가정을 하여 $\displaystyle r = \frac{ \sin^2 \left( \theta _2 - \theta _1 \right) - \sin^2 \theta _1 }{ \sin^2 \theta _2 } $로 계산하였다. (방법 3)

​	실험 ①의 측정값을 바탕으로, 세 가지 방법을 적용하였고, 그 결과는 **표 3**과 같다. 세 방법 모두, 모든 경우에 대하여 $r>1$의 결과를 얻었다. 그러나 방법 2에서 $r \approx 1$기 때문에, 이 방법의 $r$의 값을 중심으로 질량을 알아내고자 한다.

​	**표 4**는 각 경우에 대하여 세 가지 방법으로 계산한 $r$ 값을 보여준다. **표 3**과 비교해볼 때, 첫 번째 경우에는 빨간 원판에 15g 추를, 두 번째 경우에는 초록 원판에 10g 추를, 마지막 경우에는 빨간 원판과 초록 원판에 각각 15g과 10g의 추를 넣었음을 알아낼 수 있었다.[부록 4]

<p style="text-align: center;"><b>표 3: 실험 ①에서 세 가지 방법을 적용한 $r$의 값</b></p>

|      |  방법 1  |  방법 2  |  방법 3  |
| :--: | :------: | :------: | :------: |
| 1차  | 1.099301 | 1.053003 | 1.209221 |
| 2차  | 1.164067 | 1.001927 | 1.194155 |
| 3차  | 1.205360 | 1.001173 | 1.467072 |



<p style="text-align: center;"><b>표 3: 실험 ①에서 세 가지 방법을 적용한 $r$의 값</b></p>

| Case |                       |           방법 1            |           방법 2            |           방법 3            |
| :--: | :-------------------: | :-------------------------: | :-------------------------: | :-------------------------: |
|  1   | 1차<br />2차<br />3차 | 0.770<br />0.690<br />0.861 | 0.761<br />0.688<br />0.781 | 1.220<br />1.178<br />1.347 |
|  2   | 1차<br />2차<br />3차 | 1.526<br />1.779<br />1.390 | 1.177<br />1.488<br />1.359 | 2.711<br />2.596<br />2.011 |
|  3   | 1차<br />2차<br />3차 | 0.927<br />1.009<br />0.870 | 0.996<br />0.817<br />0.915 | 1.695<br />2.447<br />0.691 |

#### 2-2-4. 실험 ③의 결과

​	1-2-5절의 두 식 $\displaystyle f = \left( \frac{v}{v _0} \right)^2$, $\displaystyle f = \left( \frac{ \sin \theta _0 }{ \sin \theta _2 } \right)^2$을 이용하여 철선의 탄성 계수 $f$를 계산하였고, 그 결과는 **표 5**와 같다. $f \approx 0.931 \pm 0.015$로 추정되나, $f>1$와 같이 불가능한 결과값 또한 얻을 수 있었다. 이러한 결과의 원인에 대하여 2-3절에서 다룰 것이다.

<p style="text-align: center;"><b>표 5: 두 가지 식으로 계산한 철선의 탄성 계수</b></p>

|      | 속도 식 | 각도 식 |
| :--: | :-----: | :-----: |
| 1차  | 0.9461  | 2.3439  |
| 2차  | 1.0405  | 0.8818  |
| 3차  | 0.9168  | 1.3718  |

### 2-3. 오차 분석

​	본 절에서는 실험 결과의 오차에 대하여 다룬다. 오차의 발생 원인, 이론과 실험값의 차이의 발생 원인을 분석하고, 개선 방안을 제시한다.

#### 2-3-1. 원판의 회전 운동에 의한 오차

​	**표 1**의 1차에서 운동량이 증가한 현상과, **표 2**에서 운동 에너지가 다양한 폭으로 감소한 현상, **표 5**의 $f>1$ 현상은 모두 회전 운동으로 설명할 수 있다.

​	원판은 다른 물체와 충돌한다면 마찰 때문에 필연적으로 회전 운동을 하게 된다. 실험 ①에서 원판끼리 충돌하여 회전 운동이 발생하였으나, 분석 과정에서 오직 병진 운동 에너지만 고려하였기에, **표 2**에서 운동 에너지가 감소하는 것처럼 관찰되었다. 감소 폭이 다양한 이유는, 실험 과정에서 두 원판의 충돌 두께가 일정하지 않았는데, 충돌 두께에 따라 회전 정도가 달라져, 회전 운동 에너지의 크기가 큰 폭을 가졌기 때문이다.

​	나머지 현상은 사람에 의하여 발생한 회전 운동 때문으로 생각된다. 원판을 밀 때, 의도하지 않은 회전이 발생하였고, 이는 원판이 측정값보다 더 큰 초기 운동 에너지를 가지도록 만들었다. **표 2**의 1차의 사잇각이 50°로 상당히 작았던 점, 실험 ②의 2차에서 벽에 대한 원판의 입사와 반사가 같은 방향에서 이루어진 점은 실제 실험 과정에서 회전이 발생하였음을 보여준다.

​	원판을 밀 때 간이 발사 장치를 사용하거나, 마찰이 적은 원판과 벽 사용, 원판을 벽에 수직하게 미는 것은 이러한 오차를 줄여줄 것이다.

#### 2-3-2. 공기와 마찰에 의한 오차

​	**표 1**의 2·3차에서 운동량이 조금 감소한 현상을 포함하여, 실험 측정값 전반에 걸쳐, 공기 테이블의 공기와 원판 간의 상호작용은 오차를 발생시켰을 것이다.

​	충돌 없이 직진 운동하는 원판의 속도를 측정하였고, 시간이 지남에 따라 다소 감소하는 현상을 관찰할 수 있었다. $t$ - $\ln v$ 그래프의 일차 추세선에서 항력 계수 $b=1.285 \times 10^{-2}$를 얻을 수 있었다. 항력을 적용하여 **표 1**의 2·3차 측정값을 보정한 결과, 운동량 보존 법칙에 더욱 적합한 데이터를 얻을 수 있었다.[부록 5]

​	원판에 작용하는 중력을 상쇄하기 위하여 공기는 필수적이고, 그렇기에 공기와 원판 간의 마찰을 없애는 것은 불가능하다. 매끈한 표면의 원판을 사용하여 공기와 마찰력을 작게 하거나, 마찰력을 측정하는 추가 실험을 진행하여 측정값을 보정하는 방법으로 오차를 개선할 수 있다.

#### 2-3-3. 관측자 및 실험 장치에 의한 오차

​	공기 테이블이 정확하게 수평으로 맞춰지지 않은 경우나, 공기 테이블의 통기공이 충분하게 빽빽하지 않아 테두리에서 공기의 힘이 약해지는 경우, 통기공마다 나오는 공기의 힘이 다른 경우에는 측정값 전반에 걸쳐 크고 작은 오차를 발생시킨다. 그러나 이는 정량적으로 해석하기 어려우며, 더욱 정밀한 실험 장치를 사용하는 것이 유일한 해결 방안으로 생각된다.

## 3. 결론

​	본 실험에서는 공기 테이블 위에서 두 원판을 충돌시킴으로써 운동량 보존 법칙을 검증하였다. 뉴턴의 운동 법칙에 의하여 충돌 여부와 관계없이 물체의 운동량의 총합은 보존됨을 확인하였다. 뿐만 아니라, 두 원판이 충돌하는 동일한 현상을, 여러 물리학 법칙을 적용하여 다양한 방법으로 해석해보았다. 두 원판의 질량비나 철선의 탄성 계수를 측정할 때, 두 가지 이상의 방법을 적용하였고, 그 중 타당한 값을 채택함으로써 측정의 정확도를 높였다.

​	실험은 이상적인 이론대로 정확하게 진행되지는 않았다. 두 원판이 충돌할 때, 약간의 운동량 손실이 발생하였고, 질량이 같은 두 원판의 질량비가 1보다 크게 계산되었으며, 측정한 철선의 탄성 계수가 1 초과인 경우 또한 발생하였다. 이러한 오차의 원인은 원판에서 발생한 회전 운동, 공기와 원판 간의 마찰력, 실험 진행자나 실험 장치에 의한 오차 등이 있다. 마지막 경우를 제외하고 모두 명확한 해결 방법을 제시하였고, 제외한 오차 원인 또한 측정 장치의 정밀도를 높임으로써 해결할 수 있다. 이러한 방안을 적용하여 더욱 정확한 실험을 진행할 수 있을 것으로 기대된다.

## 4. 참고 문헌

[1] Halliday. et al, “일반물리학”, 개정10판, John Wiley & Sons, Inc. p.260.

[2] Michel Y. Louge, Michael E. Adams. (2002). Anomalous behavior of normal kinematic restitution in the oblique impacts of a hard sphere on an elastoplastic plate. Phys. Rev. E. **65**: 021303.

## 5. 부록

### 5-1. 완전 탄성 충돌에서 질량비

​	**그림 1**의 상황을 가정하자. 다음과 같이 운동량을 나타내자.

$$ \overrightarrow{p} _0 = m _2 \overrightarrow{v} _0 $$

$$ \overrightarrow{p} _1 = m _1 \overrightarrow{v} _1 $$

$$ \overrightarrow{p} _2 = m _2 \overrightarrow{v} _2 $$

​	운동량 보존 법칙에 의하여, 다음이 성립한다.

$$ \overrightarrow{p} _0 = \overrightarrow{p} _1 + \overrightarrow{p} _2 $$

​	완전 탄성 충돌이기 때문에, 운동 에너지의 총합 또한 보존된다.

$$ m _2 v _0^2 = m _1 v _1^2 + m _2 v _2^2 $$

​	고로 두 식을 엮어 다음을 얻는다.

$$ \frac{1}{m _2} p _0^2 = \frac{1}{m _1} p _1^2 + \frac{1}{m _2} p _2^2 $$

​	벡터 식 $\overrightarrow{p} _0 = \overrightarrow{p} _1 + \overrightarrow{p} _2$의 $x$성분과 $y$성분을 구분하면 다음을 얻는다.

$$ p _0 = p _1 \cos \theta _1 + p _2 \cos \theta _2 $$

$$ p _1 \sin \theta _1 + p _2 \sin \theta _2 = 0 $$

​	이를 $p _1$과 $p _2$에 대한 연립방정식으로 해석하면, 이 둘을 $p _0$에 관하여 표현할 수 있다.

$$ p _1 = \frac{ p _0 \sin \theta _2 }{ \sin \left( \theta _2 - \theta _1 \right) } $$

$$ p _2 = \frac{ p _0 \sin \theta _1 }{ \sin \left( \theta _2 - \theta _1 \right) } $$

​	따라서 질량비를 $\theta _0$, $\theta _1$, $\theta _2$만으로 표현할 수 있다.

$$ \frac{m _2}{m _1} = \frac{ p _0^2 - p _2^2 }{ p _1^2 } = \frac{ 1 - \left( \frac{ \sin \theta _1 }{ \sin \left( \theta _2 - \theta _1 \right) } \right)^2 }{ \left( \frac{ \sin \theta _2 }{ \sin \left( \theta _2 - \theta _1 \right) } \right)^2 } = \frac{ \sin^2 \left( \theta _2 - \theta _1 \right) - \sin^2 \theta _1 }{ \sin^2 \theta _2 } $$

### 5-2. 운동량 보존 법칙 벡터 식의 분석

​	두 원판의 질량비 $\displaystyle r = \frac{ m _2 }{ m _1 }$를 알아내기 위하여, 운동량 보존 법칙을 벡터로 나타낸 식

$$ r \overrightarrow{v} _0 = \overrightarrow{v} _1 + r \overrightarrow{v} _2 $$

을 생각하자. 이를 정리하면

$$ \overrightarrow{v} _1 + r \overrightarrow{v} _2 - \overrightarrow{v} _0 = \mathbf{O} $$

이므로, 이상적인 $r$의 값은 다음 식의 값을 최소화할 것이다.

$$ \left\lVert \overrightarrow{v} _1 + r \overrightarrow{v} _2 - \overrightarrow{v} _0 \right\rVert $$

​	편의를 위하여 다음과 같이 벡터를 표현하자.

$$ \overrightarrow{v} _1 = x _a \mathbf{i} + y _a \mathbf{j} $$

$$ \overrightarrow{v} _0 - \overrightarrow{v} _2 = x _b \mathbf{i} + y _b \mathbf{j} $$

​	목표는 다음 함수 $f$가 최솟값을 가지는 $r = r _\text{min}$을 구하는 것이다.

$$ f(r) = \left\lVert x _a \mathbf{i} + y _a \mathbf{j} - r \left( x _b \mathbf{i} + y _b \mathbf{j} \right) \right\rVert ^2 $$

​	함수 $f$를 풀어 쓰면 다음과 같다.

$$ f(r) = \left( x _b^2 + y _b^2 \right) r^2 - 2 \left( x _a x _b + y _a y _b \right) r + \left( x _a^2 + y _a^2 \right) $$

​	따라서,
$$ \displaystyle r _\text{min} = \frac{ x _a x _b + y _a y _b }{ x _b^2 + y _b^2 } $$

### 5-3. 측정 데이터의 흔들림 보정

​	측정 결과의 raw data에서, 원판이 직선 방향 운동을 함에도 불구하고 중심의 좌표가 진동하는 현상이 자주 발견되었다. 원판 중심의 운동 자취를 여러 개의 선분으로 분리하였고, 각 선분에 해당하는 운동 상의 좌표에 대해 일차 추세선을 계산함으로써, 데이터를 보정하였다.

![img](https://lh4.googleusercontent.com/Lnoy3gJLF4rVUvpLMUQzipmdHlIlmLh2eTK5Gu-eM_1ly0qqzAgntB0iI3Xr6CZ8jCBzRwvxhsBEEBa8g3rAI9itUYE7y-T5k_QtqI3S5r5SCtiatUX0Gdlgt-9mYF8Aa6fdIZg)

<p style="text-align: center;"><b>그림 A1: 실험 ①의 1차에서 두 원판의 충돌 모식도</b></p>



![img](https://lh5.googleusercontent.com/xSWvgJQpFx8Qmmy638K4bKCN1LAIE_xTSQA58rCHx8ioyw9D9_xFCOlVgEBmrMy8RAEwq_aEt8KtwIKKJpLShTz3W7BZpwmwST1-x8CCQiGE2LRF5hSa08KmWBERZmD6aUpFVmw)

<p style="text-align: center;"><b>그림 A2: 실험 ①의 2차에서 두 원판의 충돌 모식도</b></p>



![img](https://lh6.googleusercontent.com/CLsdHntbs6rUdO6u3VqbJzV1_gCped9uz5KVWlIQDiL6_FZNdwp3gO8odNeZBnkVHZV2hXqZTknJuV2W1j6g-h_LAGbaBynbKH_H2sq4FJdKqO-7JAnAnJ5S3QOcBnaL5KkLlos)

<p style="text-align: center;"><b>그림 A3: 실험 ①의 3차에서 두 원판의 충돌 모식도</b></p>



![img](https://lh4.googleusercontent.com/P6CFY9xdPCdGPmIXrdT1FXok3QKeMLA3e_wJp0Xz3ZkkesXa7ffm5Tjx9sUNnl1QpeCdJcJqltXG8Oge5Zoow14us1qWqOVoxQaTkuPTb0Twx_GafHg__KRRyHpp2nsNYHYKqHk)

<p style="text-align: center;"><b>그림 C1: 실험 ③의 1차에서 두 원판의 충돌 모식도</b></p>



![img](https://lh4.googleusercontent.com/_0YkGI2Za6jcxK3Sh0T8L1Qvu3Jfra5Ow_3aPuIibwC_zop4jvogm65_U_ahmqr6ax80tHDC7jHRhXZqYuPp0S-YQThrk_1Tfz76aHQPvmI9WWZOMVaGX5s-09j9GmODnmpv1Sg)

<p style="text-align: center;"><b>그림 C2: 실험 ③의 2차에서 두 원판의 충돌 모식도</b></p>



![img](https://lh3.googleusercontent.com/RFKJcnqm_WJei3hbeHze2IaxzXqW82kKTYoCFDH4l0lLgbAeDuR8wDb2gnJezb8hW2v5Lnd4hThjVz3ImoD2MLh77UaDDTClcAUaIjay0z85D9Z3BP-KdSjR86ktsDqMSJvMMRw)

<p style="text-align: center;"><b>그림 C3: 실험 ③의 3차에서 두 원판의 충돌 모식도</b></p>

​	그림 C2에서 벽에 대한 원판의 입사와 반사의 방향이 서로 반대를 이루지 않음을 관찰할 수 있다. 이는 초기 원판에 시계 방향의 회전이 가해졌기 때문이라고 생각된다.

​	실험 ②에서도 동일한 데이터 보정 작업을 진행하였으나, 그 양이 너무 많기 때문에 부록에는 수록하지 않았다.

### 5-4. 추의 무게에 따른 질량비

​	**표 6**은 두 원판에 어떠한 추를 넣었을 때, 두 원판이 가지는 질량비를 보여준다. 10g 추의 질량이 $m _{10 \text{g}} = 10.2 \text{g}$임에 유의한다.

<p style="text-align: center;"><b>표 6: 추에 따른 두 원판의 질량비</b></p>

|        | 없음  | 10g 추 | 15g 추 |
| :----: | :---: | :----: | :----: |
|  없음  | 1.000 | 0.8198 | 0.7557 |
| 10g 추 | 1.220 | 1.000  | 0.9218 |
| 15g 추 | 1.323 | 1.085  | 1.000  |

### 5-5. **마찰력 분석**

​	원판이 공기 테이블 위에서 직선 방향 운동을 하는 상황을 가정하자. 공기에 의하여 원판이 받는 마찰력은 다음과 같다.

$$ \overrightarrow{F} _r = - b \overrightarrow{v} $$

여기서 $b$는 원판의 물리적 특성에 의하여 결정되는 상수다.

​	만일 원판이 초기 속력 $v _0$를 갖고, 마찰력 외의 어떠한 외력도 받지 않는 상태라면, 다음 관계식을 얻는다.

$$ \frac{ \mathrm{d} v }{ \mathrm{d} t } = - \frac{ bv }{ m } $$

$$ \frac{ \mathrm{d} v }{ v } = - \frac{ b }{ m } \mathrm{d} t $$

$$ v(t) = v _0 e^{ - \frac{ bt }{ m } } $$

$$ \ln v(t) = - \frac{b}{m} t + \ln v _0 $$

​	충돌과 회전 없이 직선 방향 운동을 하는 원판의 좌표를 분석하였고, $t$-$v$ 그래프의 일차 추세선의 기울기 $\displaystyle - \frac{b}{m} = -0.277$을 얻었다. $m=0.0464$이므로, $b=0.012853$를 구하였다.

​	**표 7**은 이러한 마찰력을 고려한 측정값을 나타낸다. **표 1**과 비교하였을 때, 2차와 3차의 오차율이 감소하였음을 알 수 있다.

<p style="text-align: center;"><b>표 7: 충돌 전후 보정된 운동량, 증감 및 오차율</b></p>

|      |         충돌         |                       운동량 합 (보정)                       |  오차  |
| :--: | :------------------: | :----------------------------------------------------------: | :----: |
| 1차  | 전<br />후<br />증감 | $ -4.9915 \times 10^{-2} \mathbf{i} + 3.9838 \times 10^{-3} \mathbf{j} $<br />$ -5.2466 \times 10^{-2} \mathbf{i} + 3.1795 \times 10^{-3} \mathbf{j} $<br />$ 2.4891 \times 10^{-3} \text{N} \cdot \text{s} $ | 5.343% |
| 2차  | 전<br />후<br />증감 | $ -5.2988 \times 10^{-2} \mathbf{i} - 1.5148 \times 10^{-5} \mathbf{j} $<br />$ -5.2638 \times 10^{-2} \mathbf{i} - 1.7919 \times 10^{-5} \mathbf{j} $<br />$ - 3.1910 \times 10^{-4} \text{N} \cdot \text{s} $ | 3.417% |
| 3차  | 전<br />후<br />증감 | $ - 6.3763 \times 10^{-2} \mathbf{i} - 9.5331 \times 10^{-3} \mathbf{j} $<br />$ - 6.3264 \times 10^{-2} \mathbf{i} - 9.1262 \times 10^{-3} \mathbf{j} $<br />$ - 5.5347 \times 10^{-4} \text{N} \cdot \text{s} $ | 0.999% |

# 보고서 원본

* <a href="/downloadable_files/physicslab1/billiards_report.docx" download="download">Word (.docx)</a>
* <a href="/downloadable_files/physicslab1/billiards_report.pdf" download="download">PDF (.pdf)</a>

