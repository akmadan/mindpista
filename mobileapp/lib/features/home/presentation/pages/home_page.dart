import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:mobileapp/utils/theme/theme_provider.dart';
import 'package:mobileapp/project/di/di.dart';
import 'package:mobileapp/project/logs/logger/app_logger.dart';
import 'package:mobileapp/project/logs/logger/app_logger_message_type.dart';
import 'package:mobileapp/design/index.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final TextEditingController _textController = TextEditingController();
  String _logMessage = '';

  @override
  void dispose() {
    _textController.dispose();
    super.dispose();
  }

  void _showLoggingDemo() {
    final logger = AppDi.getIt.get<AppLogger>();
    
    logger.logMessage('User clicked logging demo button', messageType: AppLoggerMessageType.info);
    logger.logMessage('Debug message from home page', messageType: AppLoggerMessageType.debug);
    logger.logMessage('Warning: This is a test warning', messageType: AppLoggerMessageType.warning);
    logger.logError('Error: This is a test error message');
    
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Check the console/logs for demo messages!'),
        duration: Duration(seconds: 2),
      ),
    );
  }

  void _showCustomLogMessage() {
    if (_logMessage.isNotEmpty) {
      final logger = AppDi.getIt.get<AppLogger>();
      logger.logMessage('Custom log: $_logMessage', messageType: AppLoggerMessageType.info);
      
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Logged: $_logMessage'),
          duration: const Duration(seconds: 2),
        ),
      );
      _textController.clear();
      setState(() {
        _logMessage = '';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Flutter App Template'),
        backgroundColor: Theme.of(context).colorScheme.surface,
        foregroundColor: Theme.of(context).colorScheme.onSurface,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.info_outline),
            onPressed: () {
              showDialog(
                context: context,
                builder: (context) => AlertDialog(
                  title: const Text('App Template Info'),
                  content: const Text(
                    'This is a comprehensive Flutter app template with:\n\n'
                    '• Clean Architecture\n'
                    '• BLoC State Management\n'
                    '• Dependency Injection\n'
                    '• GoRouter Navigation\n'
                    '• Design System\n'
                    '• Theme Management\n'
                    '• Logging System\n'
                    '• Shared Preferences\n'
                    '• Responsive Design',
                  ),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.of(context).pop(),
                      child: const Text('OK'),
                    ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Welcome Section
            AppCard(
              title: Text(
                'Welcome to Flutter App Template',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: Theme.of(context).colorScheme.onSurface,
                ),
              ),
              subtitle: Text(
                'A comprehensive template with clean architecture',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
              ),
              leading: Icon(
                Icons.rocket_launch,
                color: Theme.of(context).colorScheme.primary,
                size: 32,
              ),
            ),
            
            const SizedBox(height: 24),
            
            // Theme Management Section
            Text(
              '🎨 Theme Management',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.bold,
                color: Theme.of(context).colorScheme.onBackground,
              ),
            ),
            const SizedBox(height: 16),
            const ThemeSwitcher(),
            
            const SizedBox(height: 24),
            
            // Design System Components Section
            Text(
              '🎯 Design System Components',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.bold,
                color: Theme.of(context).colorScheme.onBackground,
              ),
            ),
            const SizedBox(height: 16),
            
            // Buttons Demo
            AppCard(
              title: Text(
                'Button Variants',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: Theme.of(context).colorScheme.onSurface,
                ),
              ),
              subtitle: Text(
                'Different button styles from design system',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      AppButton(
                        text: 'Primary',
                        variant: AppButtonVariant.primary,
                        onPressed: () => _showSnackBar('Primary button pressed'),
                      ),
                      AppButton(
                        text: 'Secondary',
                        variant: AppButtonVariant.secondary,
                        onPressed: () => _showSnackBar('Secondary button pressed'),
                      ),
                      AppButton(
                        text: 'Outline',
                        variant: AppButtonVariant.outline,
                        onPressed: () => _showSnackBar('Outline button pressed'),
                      ),
                      AppButton(
                        text: 'Text',
                        variant: AppButtonVariant.text,
                        onPressed: () => _showSnackBar('Text button pressed'),
                      ),
                      AppButton(
                        text: 'Danger',
                        variant: AppButtonVariant.danger,
                        onPressed: () => _showSnackBar('Danger button pressed'),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'Button Sizes:',
                    style: Theme.of(context).textTheme.titleSmall?.copyWith(
                      color: Theme.of(context).colorScheme.onSurface,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      AppButton(
                        text: 'Small',
                        size: AppButtonSize.small,
                        onPressed: () {},
                      ),
                      AppButton(
                        text: 'Medium',
                        size: AppButtonSize.medium,
                        onPressed: () {},
                      ),
                      AppButton(
                        text: 'Large',
                        size: AppButtonSize.large,
                        onPressed: () {},
                      ),
                    ],
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 16),
            
            // Text Field Demo
            AppCard(
              title: Text(
                'Text Field Component',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: Theme.of(context).colorScheme.onSurface,
                ),
              ),
              subtitle: Text(
                'Custom text input with design system styling',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  AppTextField(
                    label: 'Enter your name',
                    hint: 'John Doe',
                    prefixIcon: const Icon(Icons.person),
                    onChanged: (value) {
                      setState(() {
                        _logMessage = value;
                      });
                    },
                    controller: _textController,
                  ),
                  const SizedBox(height: 16),
                  AppTextField(
                    label: 'Email',
                    hint: 'john@example.com',
                    prefixIcon: const Icon(Icons.email),
                    keyboardType: TextInputType.emailAddress,
                  ),
                  const SizedBox(height: 16),
                  AppTextField(
                    label: 'Password',
                    hint: 'Enter your password',
                    prefixIcon: const Icon(Icons.lock),
                    obscureText: true,
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 16),
            
            // Divider Demo
            AppCard(
              title: Text(
                'Divider Component',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: Theme.of(context).colorScheme.onSurface,
                ),
              ),
              subtitle: Text(
                'Custom divider with design system styling',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
              ),
              child: Column(
                children: [
                  Text(
                    'Content above divider',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Theme.of(context).colorScheme.onSurface,
                    ),
                  ),
                  const AppDivider(),
                  Text(
                    'Content below divider',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Theme.of(context).colorScheme.onSurface,
                    ),
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 24),
            
            // Logging Section
            Text(
              '📝 Logging System',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.bold,
                color: Theme.of(context).colorScheme.onBackground,
              ),
            ),
            const SizedBox(height: 16),
            
            AppCard(
              title: Text(
                'Logger Demo',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: Theme.of(context).colorScheme.onSurface,
                ),
              ),
              subtitle: Text(
                'Test the logging system with different message types',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  AppButton(
                    text: 'Show Logging Demo',
                    variant: AppButtonVariant.primary,
                    onPressed: _showLoggingDemo,
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(
                        child: AppTextField(
                          label: 'Custom Log Message',
                          hint: 'Enter a message to log',
                          onChanged: (value) {
                            setState(() {
                              _logMessage = value;
                            });
                          },
                          controller: _textController,
                        ),
                      ),
                      const SizedBox(width: 8),
                      AppButton(
                        text: 'Log',
                        variant: AppButtonVariant.secondary,
                        onPressed: _showCustomLogMessage,
                      ),
                    ],
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 24),
            
            // Architecture Info Section
            Text(
              '🏗️ Architecture Features',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.bold,
                color: Theme.of(context).colorScheme.onBackground,
              ),
            ),
            const SizedBox(height: 16),
            
            AppCard(
              title: Text(
                'Clean Architecture',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: Theme.of(context).colorScheme.onSurface,
                ),
              ),
              subtitle: Text(
                'This app follows clean architecture principles',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildFeatureItem('BLoC State Management', Icons.view_list),
                  _buildFeatureItem('Dependency Injection', Icons.settings),
                  _buildFeatureItem('GoRouter Navigation', Icons.navigation),
                  _buildFeatureItem('Design System', Icons.design_services),
                  _buildFeatureItem('Theme Management', Icons.palette),
                  _buildFeatureItem('Logging System', Icons.article),
                  _buildFeatureItem('Shared Preferences', Icons.storage),
                  _buildFeatureItem('Responsive Design', Icons.phone_android),
                ],
              ),
            ),
            
            const SizedBox(height: 24),
            
            // Theme Test Section
            Text(
              '🧪 Theme Test',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.bold,
                color: Theme.of(context).colorScheme.onBackground,
              ),
            ),
            const SizedBox(height: 16),
            
            AppCard(
              title: Text('Theme Test Card'),
              subtitle: Text('This card should have proper text colors in both themes'),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Primary text color test',
                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                      color: Theme.of(context).colorScheme.onSurface,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Secondary text color test',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Theme.of(context).colorScheme.onSurfaceVariant,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Background text color test',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Theme.of(context).colorScheme.onBackground,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Icon(
                        Icons.light_mode,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                      const SizedBox(width: 8),
                      Text(
                        'Current theme: ${context.watch<ThemeNotifier>().currentThemeName}',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Theme.of(context).colorScheme.onSurface,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 24),
            
            // Quick Actions Section
            Text(
              '⚡ Quick Actions',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.bold,
                color: Theme.of(context).colorScheme.onBackground,
              ),
            ),
            const SizedBox(height: 16),
            
            AppCard(
              title: Text(
                'Navigation & Actions',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: Theme.of(context).colorScheme.onSurface,
                ),
              ),
              subtitle: Text(
                'Test various app features',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
              ),
              child: Column(
                children: [
                  AppButton(
                    text: 'Show Snackbar Demo',
                    variant: AppButtonVariant.outline,
                    onPressed: () => _showSnackBar('This is a snackbar demo!'),
                  ),
                  const SizedBox(height: 8),
                  AppButton(
                    text: 'Show Dialog Demo',
                    variant: AppButtonVariant.outline,
                    onPressed: () => _showDialogDemo(context),
                  ),
                  const SizedBox(height: 8),
                  AppButton(
                    text: 'Toggle Theme',
                    variant: AppButtonVariant.text,
                    onPressed: () {
                      context.read<ThemeNotifier>().toggleTheme();
                    },
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildFeatureItem(String title, IconData icon) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          Icon(
            icon,
            size: 20,
            color: Theme.of(context).colorScheme.primary,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              title,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Theme.of(context).colorScheme.onSurface,
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        duration: const Duration(seconds: 2),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _showDialogDemo(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Dialog Demo'),
        content: const Text(
          'This is a demo dialog showing the app\'s dialog styling. '
          'The dialog uses the current theme colors and styling.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.of(context).pop();
              _showSnackBar('Dialog action confirmed!');
            },
            child: const Text('Confirm'),
          ),
        ],
      ),
    );
  }
}
