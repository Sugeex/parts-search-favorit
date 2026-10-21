const API_URL = 'https://api.favorit-parts.ru/hs/hsprice/';
const API_TEST_KEY = '00000000-0000-0000-0000-000000000001';

const KNOWN_ERRORS = {
  'Empty key!': 'Не указан ключ покупателя.',
  'Invalid key client!': 'Неверный ключ покупателя.',
  'Empty number goods!': 'Не указан номер детали.',
  'Request quota exceeded!': 'Превышен лимит запросов.',
};

function errorText(error) {
  const list = Array.isArray(error) ? error : [error];
  return list.map((e) => KNOWN_ERRORS[e] || String(e)).join(' ');
}

export async function fetchGoods(params) {
  const query = new URLSearchParams({ key: API_TEST_KEY, ...params });

  let res;
  try {
    res = await fetch(`${API_URL}?${query}`);
  } catch {
    throw new Error('Не удалось связаться с сервером. Проверьте подключение к сети и повторите поиск.');
  }
  if (!res.ok) throw new Error(`Сервер вернул ошибку ${res.status}. Повторите поиск позже.`);

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('Сервер вернул некорректный ответ. Повторите поиск позже.');
  }

  if (data && data.error) throw new Error(errorText(data.error));

  const goods = Array.isArray(data) ? data : data?.goods ?? [];
  return goods.filter((g) => g && g.number);
}
