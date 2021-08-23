import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

export default function NavDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [{ selectedLabelId, isNavBarOpen }, { toggleNavBar, setSelectedLabelId }] = useUiStore();

  const onDrawerItemSelected = (labelId) => {
    setSelectedLabelId(labelId);
  }

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
      <List>
        <DrawerItem
          text={"MainDrawer-1"}
          isSelected={selectedLabelId === ""}
          icon={<IdeaIcon htmlColor={theme.custom.palette.iconColor} />}
          onClick={() => onDrawerItemSelected("")}
        />
      </List>
      <Divider />
      <div className={classes.sectionTitle}>
        <Typography variant="overline" component="span">
          SubListDrawer
        </Typography>
      </div>
      <List>
        <DrawerItem
          key={'drawer-1'}
          text={'drawer-1'}
          icon={<LabelIcon htmlColor={theme.custom.palette.iconColor} />}
          isSelected={selectedLabelId === 'drawer-1'}
          onClick={() => onDrawerItemSelected('drawer-1')}
        />
        <DrawerItem
          key={'drawer-2'}
          text={'drawer-2'}
          icon={<LabelIcon htmlColor={theme.custom.palette.iconColor} />}
          isSelected={selectedLabelId === 'drawer-2'}
          onClick={() => onDrawerItemSelected('drawer-2')}
        />
        <DrawerItem
          key={'drawer-3'}
          text={'drawer-3'}
          icon={<LabelIcon htmlColor={theme.custom.palette.iconColor} />}
          isSelected={selectedLabelId === 'drawer-3'}
          onClick={() => onDrawerItemSelected('drawer-3')}
        />
        <DrawerItem
          key={'drawer-4'}
          text={'drawer-4'}
          icon={<LabelIcon htmlColor={theme.custom.palette.iconColor} />}
          isSelected={selectedLabelId === 'drawer-4'}
          onClick={() => onDrawerItemSelected('drawer-4')}
        />
      </List>
    </Drawer>
  );
}
