import 'package:flutter/material.dart';
import '../../../settings/presentation/pages/settings_page.dart';

class BottomTabViewPage extends StatefulWidget {
  const BottomTabViewPage({super.key});

  @override
  State<BottomTabViewPage> createState() => _BottomTabViewPageState();
}

class _BottomTabViewPageState extends State<BottomTabViewPage> {
  int _currentIndex = 0;

  final List<Widget> _pages = [
    const HomeTab(),
    const TherapyTab(),
    const MeditationTab(),
    const SettingsPage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        selectedItemColor: Theme.of(context).primaryColor,
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.psychology),
            label: 'Therapy',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.self_improvement),
            label: 'Meditation',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            label: 'Settings',
          ),
        ],
      ),
    );
  }
}

// Tab pages
class HomeTab extends StatelessWidget {
  const HomeTab({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.home, size: 64, color: Colors.blue),
          SizedBox(height: 16),
          Text(
            'Home',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 8),
          Text('Welcome to MindPista'),
        ],
      ),
    );
  }
}

class TherapyTab extends StatelessWidget {
  const TherapyTab({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.psychology, size: 64, color: Colors.green),
          SizedBox(height: 16),
          Text(
            'Therapy',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 8),
          Text('Start your therapy session'),
        ],
      ),
    );
  }
}

class MeditationTab extends StatelessWidget {
  const MeditationTab({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.self_improvement, size: 64, color: Colors.purple),
          SizedBox(height: 16),
          Text(
            'Meditation',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 8),
          Text('Find your inner peace'),
        ],
      ),
    );
  }
}

