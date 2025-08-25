import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "@/context/authContext";
import { RootNavigator } from "@/navigator/RootNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </AuthProvider>
  );
}
