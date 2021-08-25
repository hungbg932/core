import { connect } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'date', headerName: 'Date', width: 160 },
  { field: 'blocking_summary', headerName: 'Blocking summary', width: 300 },
  { field: 'user_name', headerName: 'Created by', width: 250 },
  { field: 'created_at', headerName: 'Created at', width: 160 },
  { field: 'team_name', headerName: 'Team', width: 300 }
];

function DanhSachBaoCao(props) {
  
  const listReport = props.report_list.data;
  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={listReport}
        columns={columns}
        pageSize={20}
        disableSelectionOnClick
      />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    report_list: state.report.list
  };
};

const mapDispatchToProps = (dispatch) =>  {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DanhSachBaoCao);