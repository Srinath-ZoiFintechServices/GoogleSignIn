import { NativeModules ,AppRegistry} from 'react-native';
import DeviceInfo from 'react-native-device-info';
const { Heartbeat } = NativeModules;

export default Heartbeat;

const MyHeadlessTask = async () => {
    console.log( DeviceInfo.getModel(),'Task Start');
};

AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);