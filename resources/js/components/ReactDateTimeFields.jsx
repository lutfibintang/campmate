import DatePicker from './forms/DatePicker';
import TimePicker from './forms/TimePicker';
import ImageUpload from './forms/ImageUpload';
import SelectDropdown from './forms/SelectDropdown';

export function DateField(props) {
    return <DatePicker {...props} />;
}

export function TimeField(props) {
    return <TimePicker {...props} />;
}

export function SelectField(props) {
    return <SelectDropdown {...props} />;
}

export { DatePicker, TimePicker, ImageUpload, SelectDropdown };
