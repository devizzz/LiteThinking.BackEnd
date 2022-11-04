# LiteThinking.BackEnd

## System Requirements
- node 18
- npm 8


## Name Function 
- ApiLiteThinking


## Getting Started

Install dependencies
```bash
npm install
```

Run the application
```bash
func host start
```

## Endpoint to test 
```
https://litethinkingapi.azurewebsites.net/api/ApiLiteThinking
```
```JSON
GET
[
  {
    "id": string,
    "NIT": string,
    "name": string,
    "phone": string,
    "created_at": string,
    "products": [
      {
        "name": string,
        "stock": number,
        "unit_price": number
      }
    ]
  }
]
```
```JSON
POST
{
   "NIT": string,
   "name": string,
   "phone": string,
   "created_at": string,
   "products": [
    {
      "name": string,
      "stock": number,
      "unit_price": number
    }
   ]
  ]
}
```
