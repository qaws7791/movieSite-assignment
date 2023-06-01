# 1. install

/scripts/env.json 생성 후 

TMDB Access Token 작성

```json
/scripts/env.json
{
  "accessToken": "<TMDB accessToken>"
}
```



## 2.필수 요구사항

1. jQuery 사용하지 않기
2. TMDB 오픈 API를 이용하여 인기영화 데이터 가져오기
3. 영화정보 카드 리스트 UI 구현 & 클릭 시 alert 창 띄우기
   1. title(제목)
   2. overview(내용 요약),
   3. poster_path(포스터 이미지 경로),
   4. vote_average(평점)
   5. 카드 클릭 시  alert으로 `영화 id: 111`출력
4. 영화 검색 UI 구현
   1. input 사용
5. 정해진 문법을 사용
   1. 변수 선언 시에 `const` and `let`만 사용
   2. 화살표 함수`()=>{}` 사용해보기
   3. 배열 메서드 2개 이상 사용해보기
      1. forEach
      2. map
      3. filter
      4. reduce
      5. find
   4. DOM 제어를 위한 메서드 2개 이상 사용
      1. createElement
      2. getElementById 등

## 2. 선택 요구사항

1. css: flex와 grid 사용하기

2. 웹사이트 로드 후 검색 입력창에 자동 포커스 `$inputSearch.focus()`

3. 대소문자 관계 없이 검색 하기 ->`arr.filter((x) => x.match(/input/ig))`

4. enter 키 입력으로 검색버튼 클릭과 동일한 액션 구현 `e.keyCode === 13`




------

This favicon was generated using the following graphics from Twitter Twemoji:
- Graphics Title: 1f39e.svg
- Graphics Author: Copyright 2020 Twitter, Inc and other contributors (https://github.com/twitter/twemoji)
- Graphics Source: https://github.com/twitter/twemoji/blob/master/assets/svg/1f39e.svg
- Graphics License: CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/)