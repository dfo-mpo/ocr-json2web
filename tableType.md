## TableType1

TableType1 for simple key pair value ojbect: 
```
{
	"Watershed code": "93 - 3100 - 130",
 	 "Gazetted name": "FILLONGLEY CREEK"
 }
```

Json Format: 
```
{
      "tableType": "TableType1",
      "tableName": "STREAM IDENTIFICATION",
      "tableData": [
        {
          "fieldName": "Watershed Code",
          "key": "Watershed code"
        },
        {
          "fieldName": "Gazetted Name",
          "key": "Gazetted name"
        }
       ]
} 
```

Display Example:
> STREAM IDENTIFICATION
> 
| Watershed Code      | 93 - 3100 - 130    |
|---------------------|------------------- |
| Gazetted Name       | FILLONGLEY CREEK   |

## TableType2
```
{ "Date of inspection": [
    {
      "Month": "NOV",
      "Day": "18"
    },
    {
      "Month": "NOV",
      "Day": "22"
    },
    {
      "Month": "DEC",
      "Day": "04"
    }
  ]
}
```

```
  {
      "tableType": "TableType2",
      "tableName": "DATES OF INSPECTION ",
      "itemName": "Date of inspection",
      "tableData": [
        {
          "fieldName": "Month",
          "key": "Month"
        },
        {
          "fieldName": "Day",
          "key": "Day"
        }
      ]
  }
```

> DATES OF INSPECTION
> 
|        |
|--------|
| NOV 18 |
| NOV 22 |
| DEC 04 |


## TableType3

all field names is on the first row



## TableType4
For: a single list of key:value pair 

## TableType5_2
For complicated table

## TableType6
For the check box ( check box on the left)


## TableType7
filed name and value all in one row
