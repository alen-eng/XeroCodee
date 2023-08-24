
const handler = async (firstName: string ,lastName: string,email: string,password: string) => {

    
        let res = await fetch("http://localhost:3200/signup", {
            method: "POST",
            headers: {    "Content-Type": "application/json" },
            body: JSON.stringify({
              firstname:firstName,
              lastname:lastName,
              email: email,
              password: password,
            }),
          });
          res = await res.json()
          return res
        
      }
    

export default handler