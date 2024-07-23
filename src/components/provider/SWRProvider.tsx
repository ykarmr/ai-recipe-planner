import { ReactNode } from "react";
import { SWRConfig } from "swr";

export function SWRProvider({
  children,
  options,
}: {
  children: ReactNode;
  options?: React.ComponentProps<typeof SWRConfig>["value"];
}) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        revalidateOnReconnect: false,
        suspense: true,
        ...options,
      }}
    >
      {children}
    </SWRConfig>
  );
}
