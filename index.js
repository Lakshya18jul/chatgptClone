
// 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

// import { Configuration, OpenAIApi } from "openai";
const { Configuration, OpenAIApi } = require("openai");
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');


const configuration = new Configuration({
    organization: "org-0IZzJ8V8fiMYDImKtVUBLlv3",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// create a new express api that calls the above func

const app=express();
app.use(bodyParser.json());
app.use(cors());
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
const port=3080

app.post('/',async(req,res)=>{
  const {message}=req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
      // console.log(response.data.choices[0].text);
      res.json({
        // data:response.data
        message:response.data.choices[0].text
      })
})
app.listen(port,()=>{
    console.log(`server is at ${port}`);
})