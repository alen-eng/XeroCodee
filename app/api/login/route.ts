
 const refresh = async (user: string) => {
  let res = await fetch("https://host007.azurewebsites.net/refresh", {
    method: "POST",
    headers: {    "Content-Type": "application/json" },
    body: JSON.stringify({
      user: user,
    }),
  });
  res = await res.json();
  return res
  }

 const handler = async (email:string , password:string) => {
    let res = await fetch("https://host007.azurewebsites.net/signin", {
        method: "POST",
        headers: {    "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      res = await res.json();
      return res
      }

const googleHandler = async (name:string , email: string) => {
  let res = await fetch("https://host007.azurewebsites.net/auth/google", {
    method: "POST",
    headers: {    "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email:email ,
        }),
      });
      res = await res.json();
      return res
  };

  const githubHandler = async (name:string , email: string) => {
    let res = await fetch("https://host007.azurewebsites.net/auth/github", {
      method: "POST",
      headers: {    "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            email:email ,
          }),
        });
        res = await res.json();
        return res
    };


export default handler
export {refresh}
export {googleHandler}
export {githubHandler}
