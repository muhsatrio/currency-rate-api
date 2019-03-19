# Currency Rate API

## Step using:
1. Import **foreign_currency.sql** to your MySQL
2. Open **.../to_your_folder/currency-rate-api** and type **npm start** to run server
3. Your server will be run on **http://localhost:3000**

## Endpoint API

### 1. GET - List of Rate Exchange

```
http://localhost:3000/api/rate
```
- Example Input:
```
{
  date: 2017-07-07
}
```
- Example Output:
```
{
  "status": 200,
  "values": [
    {
      "from_currency": "GDP",
      "to_currency": "IDR",
      "rate_value": 0.07891,
      "average_value": null,
    },
  ]
}

```
### 2. GET - List of Trend Exchange

http://localhost:3000/api/rate_trend
```
- Example Input:
```
{
  "from": GDP,
  "to": IDR,
  "average": 0.07891,
  "variance:: 0.1
}
```
- Example Output:
```
{
  "status": 200,
  "values": [
    {
      "date_rate": "2018-09-06T17:00:00.000Z",
      "rate_value": 0.07891
    },
    ...
  ]
}

### 3. POST - Input Rate of Exchange

```
http://localhost:3000/api/rate
```
- Example Input:
```
{
  "date": 2018-09-07,
  "from": GDP,
  "to": IDR,
  "rate": 0.07891,
}
```
- Example Output:
```
{
  "status": 200,
  "values": "Data inputed successfully! :)"
  ]
}
```

### 4. POST - Input Track of Exchange Rate

```
http://localhost:3000/api/track
```
- Example Input:
```
{
  "from": GDP,
  "to": IDR,
}
```
- Example Output:
```
{
  "status": 200,
  "values": "Data inputed successfully! :)"
  ]
}
```


### 5. DELETE - Delete Track of Exchange Rate

```
http://localhost:3000/api/track
```
- Example Input:
```
{
  "from": GDP,
  "to": IDR,
}
```
- Example Output:
```
{
  "status": 200,
  "values": "Data deleted successfully! :)"
  ]
}
```
