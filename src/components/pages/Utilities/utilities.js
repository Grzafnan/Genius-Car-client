
export const verifyJWT = (email) => {
  fetch('https://genius-car-server-with-mongodb.vercel.app/jwt', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(email)
  })

    .then(res => res.json())
    .then(data => {
      // console.log(data);
      //local storage is the easiest but not best place to store jwt token.
      localStorage.setItem('genius-token', data.token)
    })
}