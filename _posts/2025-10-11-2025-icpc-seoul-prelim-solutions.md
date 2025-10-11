---
title: "2025 ICPC Asia Seoul Regional Preliminary Solution Sketches"
date: 2025-10-11 17:00:00 +0900
categories:
 - ICPC
tags:
 - ICPC
---



**Disclaimer:** This is an **unofficial** analysis of some possible ways to solve the problems of the 2025 ICPC Asia Seoul Regional Preliminary. They are not intended to give complete solutions, but rather to outline some approaches that can be used to solve the problems. If you find an error, please [send me an email](https://youngyojun.github.io/about/) about it.



## F. Inverse Look-and-Say

<small>My solution: 239 bytes.</small>

Read the input as a string $S$. If $|S|$ is odd, $S[1] = 0$, $S[2i] = 0$, or $S[2i + 1] = S[2i + 3]$, then print $-1$.

Otherwise, for each $0 \le i < |S| / 2$, print $S[2i+1]$ $S[2i]$ times.



## A. Best Partition

<small>My solution: 346 bytes.</small>

Let $D_c$ denote the answer for the first $c$ elements. Compute DP in $\mathcal{O}\left( n^2 \right)$.

Note that it can be solved in $\mathcal{O}(n)$.



## H. Mountain

<small>My solution: 354 bytes.</small>

Sort the points $(x, y)$ by $10^7 \times (x - y) - y$, then take a longest strictly increasing sequence of $x + y$.



## I. Quadratic Equation

<small>My solution: 114 bytes.</small>

Let $\alpha$ and $\beta$ be the roots of the equation $x^2 + px + kp = 0$.

Since $(\alpha + k)(\beta + k) = k^2 > 0$ and $p = 2k - (\alpha + k) - (\beta + k)$, we have $\#_p = 2 \times \#\{ n \in \mathbb{Z} \cap [1, |k|] :  n \mid k^2 \}$, and $\sum p = 2k \times \#_p$.



## C. Docking Day

<small>My solution: 865 bytes.</small>

Send all the points to $+\infty$ in $3$ moves; then $\le 5$ more moves always suffice to place them at their target positions.

Hence, we need $8 - 3 = 5$ extra coordinates beyond the $6$ critical ones. Insert up to $5$ auxiliaries into the $7$ gaps determined by $0$, the $6$ critical coordinates, and $+\infty$; then run BFS over $(6 + 5 \times 7)^3 = 41^3$ states.



## J. Rescue Squad

<small>My solution: 1,053 bytes.</small>

Reindex the vertices in nondecreasing degree, and orient each edge from the smaller to the larger index. With this orientation, each vertex has $\mathcal{O}\left( \sqrt{m} \right)$ outgoing edges.

Handle all three $C_4$ configurations in $\mathcal{O}\left( nm \right)$ total time.



## B. Bridge

<small>My solution: 1,440 bytes.</small>

Sweep the path left-to-right, maintaining a stack of downward segments that can host the bridge's left endpoint.

For each chosen pair of host segments, minimize the maximum of three linear functions; only their pairwise intersection points are relevant, but I suggest using ternary search due to floating-point error.



## E. Image Analysis

<small>My solution: 2,016 bytes.</small>

Since all $x$ and $y$ are distinct, when the frame moves by Manhattan distance $d$, the in-frame set changes by $\mathcal{O}(d)$ single-point updates.

Apply standard Mo's ordering over frames, and answer the queries with square-root decomposed bucket sums.



## D. [Fox Buki](https://www.youtube.com/channel/UCYxLMfeX1CbMBll9MsGlzmw)

<small>My solution: 1,602 bytes.</small>

Construct a bipartite graph: add an edge $(i^-, j^+)$ for each card of type $j$ owned by fan $i$. The graph is $n$-regular, so it decomposes into $n$ perfect matchings.

In matching $k$, if $(i^-, j^+)$ is chosen, define fan $i$'s $k$-th card to be of type $j$. Then swapping fan $a$'s $b$-th card with fan $b$'s $a$-th card achieves the goal, with each card used at most once.



## G. Magical Sort

<small>My solution: 1,664 bytes.</small>

Build a directed graph $G$: if $u$'s group-$c$ receiver is $v$, add an edge $v \rightarrow u$ with label $c$. For every vertex, all outgoing edges share the same label.

Put $v \in \left[ S_v \right]$ if every infinite walk from $v$ yields the same edge-label string $S_v$. The answer is $\prod_S \left| [S] \right| !$.

Form $G' \subset G$ by keeping exactly one outgoing edge per vertex. Then each $v$ has a unique infinite walk; let its string be $S'_v$. These strings can be compared in $\mathcal{O}(1)$ after $\mathcal{O}( n \log n )$ precomputation.

Now, in $G$, the information from $S'_*$ suffices to determine which vertices belong to which equivalence classes.

It is really challenging to generate valid inputs. If you know a way to validate inputs in $\mathcal{o}\left( n^2 \right)$, please let me know.
