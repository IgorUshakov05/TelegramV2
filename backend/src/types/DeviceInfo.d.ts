export interface ParticipantInfo {
  device: {
    type?: string;
    model?: string;
    vendor?: string;
  };
  os: {
    name?: string;
    version?: string;
  };
  browser: {
    name?: string;
    version?: string;
    major?: string;
    type?: string;
  };
  ip?: string;
}
