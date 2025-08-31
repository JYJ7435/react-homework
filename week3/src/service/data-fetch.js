export async function getData(signal) {
  const response = await fetch('/data/data.json', {
    signal,
  });

  if (!response.ok) throw new Error('데이터를 불러오지 못했습니다.');

  const data = await response.json();

  return data;
}

export async function getSearchData(search, signal) {
  const data = await getData(signal);

  const filterData = data.filter((data) =>
    data.search.includes(search.toLowerCase())
  );

  return filterData;
}
