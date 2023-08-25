
const hostHandler = async (hostingtype:string  ,user:string) => {
  let res = await fetch("https://host007.azurewebsites.net/host", {
      method: "POST",
      headers: {    "Content-Type": "application/json" },
      body: JSON.stringify({
        hostingtype: hostingtype,
        user:user
      }),
    });
    res = await res.json();
    return res
    }

    const optionHandler = async (hostingOption:string ,repo:string  ,user:string) => {
      let res = await fetch("https://host007.azurewebsites.net/option", {
          method: "POST",
          headers: {    "Content-Type": "application/json" },
          body: JSON.stringify({
            hostingOption: hostingOption,
            repo:repo,
            user:user
          }),
        });
        res = await res.json();
        return res
        }

const handler = async (usertype:string , value:string ,user:string) => {
    let res = await fetch("https://host007.azurewebsites.net/type", {
        method: "POST",
        headers: {    "Content-Type": "application/json" },
        body: JSON.stringify({
          usertype: usertype,
          value: value,
          user:user
        }),
      });
      res = await res.json();
      return res
      }

 const repoHandler = async ( user:string) => {
  let res = await fetch(`https://api.github.com/users/${user}/repos`, {
      method: "GET",
      headers: {    "Content-Type": "application/json" },
    });
    res = await res.json();
    return res
 }

export default handler
export {hostHandler}
export {optionHandler}
export {repoHandler}