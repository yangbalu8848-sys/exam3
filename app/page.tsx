'use client';

import { useState } from 'react';
import FourLawsFramework from './components/FourLawsFramework';
import HabitStackingFramework from './components/HabitStackingFramework';
import IdentityBasedFramework from './components/IdentityBasedFramework';
import TwoMinuteRuleFramework from './components/TwoMinuteRuleFramework';

type Framework = 'four-laws' | 'habit-stacking' | 'identity-based' | 'two-minute';

export default function Home() {
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null);

  const frameworks = [
    {
      id: 'four-laws' as Framework,
      title: '四大定律习惯构建器',
      subtitle: '让习惯显而易见、有吸引力、容易执行、令人满意',
      icon: '🎯',
      recommended: true,
      description: '最全面的习惯设计框架，适合系统性地建立新习惯'
    },
    {
      id: 'habit-stacking' as Framework,
      title: '习惯堆叠规划器',
      subtitle: '将新习惯与现有习惯绑定',
      icon: '🔗',
      recommended: false,
      description: '通过现有习惯触发新习惯，适合忙碌的生活方式'
    },
    {
      id: 'identity-based' as Framework,
      title: '身份驱动习惯系统',
      subtitle: '从"我想成为谁"出发',
      icon: '👤',
      recommended: false,
      description: '关注身份认同，建立长期持久的习惯改变'
    },
    {
      id: 'two-minute' as Framework,
      title: '2分钟启动器',
      subtitle: '降低习惯开始的门槛',
      icon: '⚡',
      recommended: false,
      description: '将习惯简化到2分钟内完成，克服拖延症'
    }
  ];

  const renderFramework = () => {
    switch (selectedFramework) {
      case 'four-laws':
        return <FourLawsFramework onBack={() => setSelectedFramework(null)} />;
      case 'habit-stacking':
        return <HabitStackingFramework onBack={() => setSelectedFramework(null)} />;
      case 'identity-based':
        return <IdentityBasedFramework onBack={() => setSelectedFramework(null)} />;
      case 'two-minute':
        return <TwoMinuteRuleFramework onBack={() => setSelectedFramework(null)} />;
      default:
        return null;
    }
  };

  if (selectedFramework) {
    return renderFramework();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-purple-900">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            原子习惯规划助手
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            基于《原子习惯》核心原理的习惯管理系统
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            &ldquo;每天进步1%，一年后你将进步37倍&rdquo; - James Clear
          </p>
        </div>

        {/* Framework Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {frameworks.map((framework) => (
            <button
              key={framework.id}
              onClick={() => setSelectedFramework(framework.id)}
              className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-500 text-left"
            >
              {framework.recommended && (
                <span className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  推荐
                </span>
              )}
              <div className="text-5xl mb-4">{framework.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {framework.title}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                {framework.subtitle}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {framework.description}
              </p>
              <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-medium">
                开始使用
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Core Principles */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            💡 原子习惯核心原则
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">关注系统，而非目标</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  目标设定方向，系统带来进步
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-300 font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">改变身份，而非行为</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  从&ldquo;我想做&rdquo;到&ldquo;我是谁&rdquo;的转变
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-300 font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">微小改变，复利效应</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  1%的改进会在一年内带来37倍的提升
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-300 font-bold">
                4
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">环境塑造行为</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  设计环境比依靠意志力更有效
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
