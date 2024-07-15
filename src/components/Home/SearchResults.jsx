const SearchResults = ({ results }) => {
  return (
    <SResultsContainer>
      {results.length === 0 ? (
        <SNoresultsWrapper>'검색결과가 없어요'</SNoresultsWrapper>
      ) : (
        results.map((result, index) => (
          <SResultItem key={index}>
            <SImageWrapper>
              <img src={result.image}></img>
            </SImageWrapper>
            <SContentWrapper>
              <div id='title'>{result.title}</div>
              <div id='name'>
                <SBoldWrapper>개설</SBoldWrapper> {result.name}
              </div>
              <div id='endDate'>
                <SBoldWrapper>마감</SBoldWrapper>
                {result.endDate}
              </div>
              <div id='tag'>
                <div id='stateTag'>{result.stateTag}</div>
                <div id='isFriend'>{result.isFriend}</div>
              </div>
            </SContentWrapper>
          </SResultItem>
        ))
      )}
    </SResultsContainer>
  );
};

export default SearchResults;
