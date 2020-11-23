import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { makeStyles } from '@material-ui/core/styles';
import {
  settingsState,
  updatedAtSettingsState,
} from '../../../recoil/selectors/settingsState';
import { ipcRequest } from '../../../utils/ipcRenderer';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  footer: {
    height: 54,
  },
}));

export default function SettingsPage() {
  const classes = useStyles();
  const settings = useRecoilValue(settingsState);
  const setUpdatedAtSettings = useSetRecoilState(updatedAtSettingsState);
  const [changedSettings, setChangedSettings] = useState({});
  const getHandlerOnChange = (name: string) => (e: any) => {
    setChangedSettings({
      ...changedSettings,
      [name]: e.target.value,
    });
  };

  const getValue = (settingName: string) => {
    if (typeof changedSettings[settingName] !== 'undefined') {
      return changedSettings[settingName];
    }
    const setting = settings.find(({ name }) => name === settingName);
    return (setting && setting.value) || '';
  };

  const handleSave = async () => {
    await ipcRequest<void>(
      'quiz/sav-settings',
      Object.entries(changedSettings).map(([name, value]) => ({
        name,
        value,
      }))
    );
    setUpdatedAtSettings(new Date());
    setChangedSettings({});
  };
  return (
    <Grid item>
      <Paper>
        <List
          subheader={<ListSubheader>Настройки</ListSubheader>}
          className={classes.root}
        >
          {settings.map(({ name, title }) => (
            <ListItem key={name}>
              <TextField
                fullWidth
                id="standard-basic"
                label={title}
                value={getValue(name)}
                onChange={getHandlerOnChange(name)}
              />
              <ListItemSecondaryAction />
            </ListItem>
          ))}
          <ListItem className={classes.footer}>
            <ListItemSecondaryAction>
              <Button onClick={handleSave} variant="contained" color="primary">
                Сохранить
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>
    </Grid>
  );
}
