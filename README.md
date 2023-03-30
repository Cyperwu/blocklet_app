# Blocklet App demo

## Usage

GET /api/txs

params:

| --      | --     | --       | --                                                    |
| param   | type   | required | description                                           |
| a       | string | true     | ethereum address                                      |
| page    | number | false    | page, default is 1                                    |
| perpage | number | false    | page size, default is 20, maximum value is 100        |
| sort    | string | false    | sort order, either 'asc' or 'desc', default is 'desc' |

returns:

```json
{
  count: 123, // count of all transactions (but it seems there are some records not being included)
  data: [], // rows of transaction data
}
```
