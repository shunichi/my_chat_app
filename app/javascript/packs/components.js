import WebpackerReact from 'webpacker-react';
import MessagesAppContainer from './containers/messages_app';
import ScheduleTableContainer from './containers/schedule_table';

WebpackerReact.setup({ MessagesAppContainer, ScheduleTableContainer });
