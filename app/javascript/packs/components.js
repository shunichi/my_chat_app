import WebpackerReact from 'webpacker-react';
import MessagesAppContainer from './containers/messages_app';
import ScheduleTable from './components/schedules/schedule_table';

WebpackerReact.setup({ MessagesAppContainer, ScheduleTable });
