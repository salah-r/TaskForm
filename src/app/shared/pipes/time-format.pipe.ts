import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) return '';

    // Extract time components
    const [hours, minutes] = value.split(':').map(Number);

    // Convert to 12-hour format
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour = hours % 12 || 12;

    // Format the time string
    return `${this.padZero(hour)}:${this.padZero(minutes)} ${period}`;
  }

  // Helper function to pad numbers with leading zeroes
  private padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}
