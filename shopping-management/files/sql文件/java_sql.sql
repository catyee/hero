SELECT * FROM gsales;
SELECT * FROM goods;
SELECT * FROM salesman;

SELECT GNAME,GPRICE,GNUM,allSum
from goods,(SELECT GID AS salesid,sum(SNUM) as allSum
            FROM gsales
            WHERE TRUNCATE(SDATE) = TRUNCATE(SYSDATE())
            GROUP BY GID
  )WHERE GID = salesid
