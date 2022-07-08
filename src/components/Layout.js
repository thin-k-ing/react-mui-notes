import {
	AppBar,
	Avatar,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	Toolbar,
	Typography,
} from "@material-ui/core";
import { format } from "date-fns";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	page: {
		background: "#f9f9f9",
		width: "100%",
		padding: theme.spacing(3),
	},
	drawer: {
		width: drawerWidth,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	root: {
		display: "flex",
	},
	active: {
		background: "#f4f4f4",
	},
	title: {
		padding: theme.spacing(2),
	},
	appBar: {
		width: `calc(100% - ${drawerWidth}px)`,
	},
	toolBar: theme.mixins.toolbar,
	date: {
		flexGrow: 1,
	},
	avatar: {
		marginLeft: theme.spacing(2),
	},
}));

const Layout = ({ children }) => {
	const classes = useStyles();

	const history = useHistory();

	const location = useLocation();

	const menuItems = [
		{
			text: "My Notes",
			icon: <SubjectOutlined color="secondary" />,
			path: "/",
		},
		{
			text: "Create Note",
			icon: <AddCircleOutlineOutlined color="secondary" />,
			path: "/create",
		},
	];

	return (
		<div className={classes.root}>
			{/* appbar */}
			<AppBar className={classes.appBar} elevation={0}>
				<Toolbar>
					<Typography className={classes.date}>
						Today is the {format(new Date(), "do MMMM Y")}
					</Typography>
					<Typography>Mario</Typography>
					<Avatar src="/user-av.png" className={classes.avatar} />
				</Toolbar>
			</AppBar>

			{/* sidebar */}
			<Drawer
				className={classes.drawer}
				variant="permanent"
				anchor="left"
				classes={{ paper: classes.drawerPaper }}
			>
				<div>
					<Typography variant="h5" className={classes.title}>
						Ninja Notes
					</Typography>
				</div>

				{/* link / links */}
				<List>
					{menuItems.map(item => (
						<ListItem
							key={item.text}
							button
							onClick={() => history.push(item.path)}
							className={
								item.path === location.pathname
									? classes.active
									: null
							}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
					))}
				</List>
			</Drawer>

			<div className={classes.page}>
				<div className={classes.toolBar}></div>
				{children}
			</div>
		</div>
	);
};

export default Layout;
