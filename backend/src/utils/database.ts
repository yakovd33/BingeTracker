export function getSqlDateColumnToString(columnName: string) {
    return `TO_CHAR(${columnName}, 'yyyy-MM-ddTHH:mm:ssZ')`
}