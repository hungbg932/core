// import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import * as reportActions from '../../actions/reportActions';
import moment from 'moment';
import {
  Drawer,
  List,
  Divider,
  Typography,
  useTheme,
  useMediaQuery
} from "@material-ui/core";
import {
  WbIncandescentOutlined as IdeaIcon,
  LabelOutlined as LabelIcon
} from "@material-ui/icons";
import DrawerItem from "./DrawerItem";
import { useUiStore } from "../../store";
import { navigate } from "@reach/router";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: theme.mixins.drawer.minWidth,
    flexShrink: 0
  },
  drawerPaper: {
    background: theme.palette.background.default,
    width: theme.mixins.drawer.minWidth,
    border: 0
  },
  sectionTitle: {
    padding: theme.spacing(2, 1, 0, 2),
    color: theme.palette.text.secondary
  },
  toolbar: theme.mixins.toolbar
}));

export default function NavDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [{ selectedLabelId, isNavBarOpen }, { toggleNavBar, setSelectedLabelId }] = useUiStore();

  const onDrawerItemSelected = (labelId) => {
    navigate(labelId);
    setSelectedLabelId(labelId);
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      anchor="left"
      open={isNavBarOpen}
      onClose={toggleNavBar}
      classes={{
        root: classes.drawer,
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      {/*<List>
        <DrawerItem
          text={"Dashboard"}
          isSelected={selectedLabelId === "/"}
          icon={<IdeaIcon htmlColor={theme.custom.palette.iconColor} />}
          onClick={() => onDrawerItemSelected("/")}
        />
      </List>
      <Divider />
      <div className={classes.sectionTitle}>
        <Typography variant="overline" component="span">
          SubListDrawer
        </Typography>
      </div>*/}
      <List>
        <DrawerItem
          key={'users'}
          text={'Quản lý user'}
          icon={<LabelIcon htmlColor={theme.custom.palette.iconColor} />}
          isSelected={selectedLabelId === 'users'}
          onClick={() => onDrawerItemSelected('users')}
        />
        <DrawerItem
          key={'list_report'}
          text={'Danh sách báo cáo'}
          icon={<LabelIcon htmlColor={theme.custom.palette.iconColor} />}
          isSelected={selectedLabelId === 'list_report'}
          onClick={() => onDrawerItemSelected('list_report')}
        />
        <DrawerItem
          key={'report'}
          text={'Báo cáo'}
          icon={<LabelIcon htmlColor={theme.custom.palette.iconColor} />}
          isSelected={selectedLabelId === 'report'}
          onClick={() => onDrawerItemSelected('report')}
        />
        {/*<DrawerItem
          key={'drawer-2'}
          text={'drawer-2'}
          icon={<LabelIcon htmlColor={theme.custom.palette.iconColor} />}
          isSelected={selectedLabelId === 'drawer-2'}
          onClick={() => onDrawerItemSelected('drawer-2')}
        />*/}
      </List>
    </Drawer>
  );
}
