import '../scss/main.scss';

const getData = async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    return data;
  } catch (err) {
    throw err.message;
  }
};

getData()
  .then((data) => console.log('data: ', data))
  .catch((err) => console.error('error: ', err));
