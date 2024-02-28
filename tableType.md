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
Only show up when there is content (null), if there is not content, the table is not render on the page.
```
  {
      "tableType": "TableType3",
      "tableName": "",
      "style": {},
      "tableData": [
        {
          "fieldName": "",
          "key": "Dates of inspection (1)"
        }
      ]
    }
```

```
 {"Dates of inspection (1)": "NOT INSPECTED THIS YEAR"}

```


>	
>	Example
>	
|                         |
|-------------------------|
| NOT INSPECTED THIS YEAR |




```
 {    "Dates of inspection (1)": null}
```
>	Example: nothing on the page


## TableType4
For: a single list of key:value pair 

## TableType5
working on it, for spawning table

## TableType6
For the check box ( check box on the left)

