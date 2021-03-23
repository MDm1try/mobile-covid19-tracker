import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string) {
    navigationRef.current?.navigate(name);
}

export function goBack() {
    navigationRef.current?.goBack();
}
