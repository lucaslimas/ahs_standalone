@ECHO OFF

call "%CD%\bin\service.config.bat"

IF $SERVICE_WIN$ EQU 64 (
SET NSSM="%CD%\bin\nssm64.exe"
) ELSE (
  SET NSSM="%CD%\bin\nssm32.exe"
)

ECHO INSTALLING SERVICE %SERVICE_NAME%

%NSSM% stop %SERVICE_NAME%
%NSSM% remove %SERVICE_NAME% confirm
%NSSM% install %SERVICE_NAME% %SERVICE_NAME%
%NSSM% set %SERVICE_NAME% Application %CD%\bin\initializer.bat
%NSSM% set %SERVICE_NAME% AppDirectory %CD%
%NSSM% set %SERVICE_NAME% Description %SERVICE_DESC%
%NSSM% set %SERVICE_NAME% Start SERVICE_AUTO_START

%NSSM% set %SERVICE_NAME% AppParameters

%NSSM% set %SERVICE_NAME% AppStopMethodSkip 0
%NSSM% set %SERVICE_NAME% AppStopMethodConsole 0
%NSSM% set %SERVICE_NAME% AppStopMethodWindow 0
%NSSM% set %SERVICE_NAME% AppStopMethodThreads 0
%NSSM% set %SERVICE_NAME% AppThrottle 0
%NSSM% set %SERVICE_NAME% AppExit Default Ignore
%NSSM% set %SERVICE_NAME% AppRestartDelay 0
%NSSM% set %SERVICE_NAME% AppStdout %CD%\logs\%SERVICE_NAME%.log
%NSSM% set %SERVICE_NAME% AppStderr %CD%\logs\%SERVICE_NAME%.log
%NSSM% set %SERVICE_NAME% AppStdoutCreationDisposition 4
%NSSM% set %SERVICE_NAME% AppStderrCreationDisposition 4
%NSSM% set %SERVICE_NAME% AppRotateFiles 1
%NSSM% set %SERVICE_NAME% AppRotateOnline 0
%NSSM% set %SERVICE_NAME% AppRotateSeconds 3600
%NSSM% set %SERVICE_NAME% AppRotateBytes 524288
%NSSM% start %SERVICE_NAME%

pause