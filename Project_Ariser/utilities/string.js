module.exports = 
{
    s_selectcustomer : "select * from ASDB_CUSTOMER",
    s_selectdrawing : "select distinct drawing_no from ASDB_COMPONENT",
    s_selectcustanddraw : "select aco.DRAWING_NO,aco.CO_DESCRIPTION,ac.C_NAME,aco.CO_PRICE_PIECE,aco.CO_HSN from ASDB_COMPONENT aco INNER JOIN ASDB_CUSTOMER ac ON aco.C_ID = ac.C_ID"
}