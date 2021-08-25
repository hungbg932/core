<?php
namespace App\Helper;

class Util{

    static function getPartial($queryData = [], $limit = 100, $page = 1, $columns = [])
    {
        $data = [];
        $offset = ($page - 1) * $limit;
        $totalRecord = $queryData->count();

        if ($totalRecord) {
            $totalPage = ($totalRecord % $limit == 0) ? $totalRecord / $limit : ceil($totalRecord / $limit);

            $data = $queryData->offset($offset)
                ->limit($limit);
            if ($columns) $data = $data->get($columns);
            else $data = $data->get();
        } else {
            $totalPage = 0;
            $page = 0;
            $totalRecord = 0;
        }

        $result = [
            'data'          => $data,
            'page'          => $page,
            'totalPage'     => $totalPage,
            'totalRecord'   => $totalRecord
        ];

        return $result;
    }
}