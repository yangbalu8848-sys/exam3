'use client';

import { useState } from 'react';

interface FourLawsFrameworkProps {
  onBack: () => void;
}

interface HabitPlan {
  habitName: string;
  law1Obvious: string;
  law2Attractive: string;
  law3Easy: string;
  law4Satisfying: string;
}

export default function FourLawsFramework({ onBack }: FourLawsFrameworkProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [habitPlan, setHabitPlan] = useState<HabitPlan>({
    habitName: '',
    law1Obvious: '',
    law2Attractive: '',
    law3Easy: '',
    law4Satisfying: ''
  });

  const steps = [
    {
      title: '第一定律：让它显而易见',
      subtitle: 'Make it Obvious',
      color: 'blue',
      icon: '👁️',
      question: '如何让这个习惯更容易被注意到？',
      placeholder: '例如：把运动鞋放在床边，早上一醒来就能看到',
      tips: [
        '使用执行意图："我会在[时间]，在[地点]，做[行为]"',
        '设计环境：让好习惯的提示显而易见',
        '使用习惯记分卡：列出当前的日常习惯，找到插入新习惯的时机'
      ],
      field: 'law1Obvious'
    },
    {
      title: '第二定律：让它有吸引力',
      subtitle: 'Make it Attractive',
      color: 'green',
      icon: '✨',
      question: '如何让这个习惯更有吸引力？',
      placeholder: '例如：运动时听喜欢的播客，只在运动时才能听',
      tips: [
        '使用诱惑捆绑：将想做的事与需要做的事配对',
        '加入文化：在习惯很正常的群体中建立习惯',
        '创建动机仪式：在困难习惯前做一些你喜欢的事'
      ],
      field: 'law2Attractive'
    },
    {
      title: '第三定律：让它容易执行',
      subtitle: 'Make it Easy',
      color: 'purple',
      icon: '⚡',
      question: '如何让这个习惯更容易开始？',
      placeholder: '例如：只做1个俯卧撑，降低开始的难度',
      tips: [
        '减少摩擦：减少好习惯的步骤数',
        '两分钟法则：将习惯简化到2分钟内可完成',
        '优化环境：准备好环境，让行为容易发生'
      ],
      field: 'law3Easy'
    },
    {
      title: '第四定律：让它令人满意',
      subtitle: 'Make it Satisfying',
      color: 'orange',
      icon: '🎉',
      question: '如何让完成这个习惯后感到满足？',
      placeholder: '例如：完成后在日历上打勾，看到连续打卡很有成就感',
      tips: [
        '使用习惯追踪：让进步可视化',
        '即时奖励：在完成习惯后给自己一个小奖励',
        '永不错过两次：如果错过一次，确保不要错过第二次'
      ],
      field: 'law4Satisfying'
    }
  ];

  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateField = (field: keyof HabitPlan, value: string) => {
    setHabitPlan({ ...habitPlan, [field]: value });
  };

  const isStepComplete = () => {
    if (currentStep === 0) return habitPlan.habitName.trim() !== '';
    const field = currentStepData.field as keyof HabitPlan;
    return habitPlan[field].trim() !== '';
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; lightBg: string }> = {
      blue: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-500', lightBg: 'bg-blue-50 dark:bg-blue-900/20' },
      green: { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-500', lightBg: 'bg-green-50 dark:bg-green-900/20' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-500', lightBg: 'bg-purple-50 dark:bg-purple-900/20' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-500', lightBg: 'bg-orange-50 dark:bg-orange-900/20' }
    };
    return colors[color] || colors.blue;
  };

  if (currentStep === steps.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-green-900 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎯</div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                你的习惯计划已完成！
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                现在你有了一个完整的习惯实施策略
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">目标习惯</h2>
                <p className="text-xl">{habitPlan.habitName}</p>
              </div>

              {[
                { title: '让它显而易见 👁️', content: habitPlan.law1Obvious, color: 'blue' },
                { title: '让它有吸引力 ✨', content: habitPlan.law2Attractive, color: 'green' },
                { title: '让它容易执行 ⚡', content: habitPlan.law3Easy, color: 'purple' },
                { title: '让它令人满意 🎉', content: habitPlan.law4Satisfying, color: 'orange' }
              ].map((law, index) => (
                <div key={index} className={`${getColorClasses(law.color).lightBg} rounded-xl p-6 border-l-4 ${getColorClasses(law.color).border}`}>
                  <h3 className={`font-bold text-lg mb-2 ${getColorClasses(law.color).text} dark:text-${law.color}-400`}>
                    {law.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">{law.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => {
                  setCurrentStep(0);
                  setHabitPlan({
                    habitName: '',
                    law1Obvious: '',
                    law2Attractive: '',
                    law3Easy: '',
                    law4Satisfying: ''
                  });
                }}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl py-4 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                创建新习惯
              </button>
              <button
                onClick={onBack}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl py-4 font-semibold hover:shadow-lg transition-all"
              >
                返回首页
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  const text = `我的习惯计划：${habitPlan.habitName}\n\n` +
                    `👁️ 让它显而易见：${habitPlan.law1Obvious}\n\n` +
                    `✨ 让它有吸引力：${habitPlan.law2Attractive}\n\n` +
                    `⚡ 让它容易执行：${habitPlan.law3Easy}\n\n` +
                    `🎉 让它令人满意：${habitPlan.law4Satisfying}`;
                  navigator.clipboard.writeText(text);
                  alert('已复制到剪贴板！');
                }}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                📋 复制计划到剪贴板
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const colorClasses = getColorClasses(currentStepData.color);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-purple-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回框架选择
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                四大定律习惯构建器
              </h1>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                步骤 {currentStep + 1} / {steps.length + 1}
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              {[...Array(steps.length + 1)].map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    index <= currentStep ? colorClasses.bg : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {currentStep === 0 ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  你想建立什么习惯？
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  先明确你想要培养的具体习惯
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  习惯名称
                </label>
                <input
                  type="text"
                  value={habitPlan.habitName}
                  onChange={(e) => updateField('habitName', e.target.value)}
                  placeholder="例如：每天早上跑步30分钟"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:text-white transition-all"
                />
              </div>

              <div className={`${colorClasses.lightBg} rounded-xl p-6`}>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">💡 建议</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• 具体明确（不要说&ldquo;多运动&rdquo;，而说&ldquo;每天早上7点跑步30分钟&rdquo;）</li>
                  <li>• 可测量（能够明确判断是否完成）</li>
                  <li>• 从小处着手（不要一开始就定太高的目标）</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl mb-4">{currentStepData.icon}</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {currentStepData.title}
                </h2>
                <p className={`${colorClasses.text} dark:text-${currentStepData.color}-400 font-medium mb-2`}>
                  {currentStepData.subtitle}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  习惯：{habitPlan.habitName}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {currentStepData.question}
                </label>
                <textarea
                  value={habitPlan[currentStepData.field as keyof HabitPlan]}
                  onChange={(e) => updateField(currentStepData.field as keyof HabitPlan, e.target.value)}
                  placeholder={currentStepData.placeholder}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:text-white transition-all resize-none"
                />
              </div>

              <div className={`${colorClasses.lightBg} rounded-xl p-6`}>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">💡 策略建议</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {currentStepData.tips.map((tip, index) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                上一步
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                isStepComplete()
                  ? `${colorClasses.bg} text-white hover:shadow-lg`
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentStep === steps.length - 1 ? '完成' : '下一步'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
