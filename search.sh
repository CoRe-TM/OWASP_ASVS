echo SEARCHING
echo $1

curl -X GET "localhost:9200/asvs/_search?pretty" -H 'Content-Type: application/json' -d'
{
  "query": {
    "match": {
      "Description": {
      "query": "'"$1"'"
      }
    }
  },
  "sort": [
    {
    }
  ]
}
'

