'use client';

import { useState } from 'react';

interface IdentityBasedFrameworkProps {
  onBack: () => void;
}

interface Identity {
  desiredIdentity: string;
  currentBehaviors: string[];
  newHabits: string[];
  evidences: string[];
}

export default function IdentityBasedFramework({ onBack }: IdentityBasedFrameworkProps) {
  const [step, setStep] = useState(0);
  const [identity, setIdentity] = useState<Identity>({
    desiredIdentity: '',
    currentBehaviors: [],
    newHabits: [],
    evidences: []
  });

  const [currentInput, setCurrentInput] = useState('');

  const identityExamples = [
    { identity: '健康的人', icon: '💪', habits: ['每天运动30分钟', '选择健康食物', '保证充足睡眠'] },
    { identity: '作家', icon: '✍️', habits: ['每天写作500字', '每周阅读一本书', '记录生活观察'] },
    { identity: '有组织的人', icon: '📋', habits: ['每天整理桌面', '使用待办清单', '定期清理邮箱'] },
    { identity: '学习者', icon: '📚', habits: ['每天学习新知识', '记录学习笔记', '定期复习'] },
    { identity: '财务自由的人', icon: '💰', habits: ['每月记账', '定期投资', '控制开支'] },
    { identity: '创意人士', icon: '🎨', habits: ['每天创作', '收集灵感', '尝试新事物'] }
  ];

  const steps = [
    {
      title: '第1步：定义你的理想身份',
      subtitle: '你想成为什么样的人？',
      icon: '👤',
      color: 'blue'
    },
    {
      title: '第2步：识别支持这个身份的行为',
      subtitle: '这样的人会做什么？',
      icon: '🎯',
      color: 'green'
    },
    {
      title: '第3步：选择你要养成的习惯',
      subtitle: '从小处开始，投票支持你的新身份',
      icon: '✨',
      color: 'purple'
    },
    {
      title: '第4步：建立身份证据',
      subtitle: '如何证明你正在成为那样的人？',
      icon: '📊',
      color: 'orange'
    }
  ];

  const addItem = (field: keyof Identity) => {
    if (currentInput.trim()) {
      setIdentity({
        ...identity,
        [field]: [...(identity[field] as string[]), currentInput.trim()]
      });
      setCurrentInput('');
    }
  };

  const removeItem = (field: keyof Identity, index: number) => {
    setIdentity({
      ...identity,
      [field]: (identity[field] as string[]).filter((_, i) => i !== index)
    });
  };

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return identity.desiredIdentity.trim() !== '';
      case 1:
        return identity.currentBehaviors.length > 0;
      case 2:
        return identity.newHabits.length > 0;
      case 3:
        return identity.evidences.length > 0;
      default:
        return false;
    }
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

  if (step === steps.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-purple-900 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">👤</div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                你的身份驱动习惯系统
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                每个行为都是对身份的一次投票
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">我的理想身份</h2>
                <p className="text-3xl font-bold">{identity.desiredIdentity}</p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-4 border-green-500">
                <h3 className="font-bold text-lg text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                  <span>🎯</span> 支持这个身份的行为
                </h3>
                <ul className="space-y-2">
                  {identity.currentBehaviors.map((behavior, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{behavior}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border-l-4 border-purple-500">
                <h3 className="font-bold text-lg text-purple-600 dark:text-purple-400 mb-3 flex items-center gap-2">
                  <span>✨</span> 我要养成的习惯
                </h3>
                <ul className="space-y-2">
                  {identity.newHabits.map((habit, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>{habit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
                <h3 className="font-bold text-lg text-orange-600 dark:text-orange-400 mb-3 flex items-center gap-2">
                  <span>📊</span> 身份证据
                </h3>
                <ul className="space-y-2">
                  {identity.evidences.map((evidence, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>{evidence}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">💡 身份改变的核心原则</h3>
                <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>1. 每个行为都是一次投票：</strong> 每次你执行习惯，就是在为你想成为的人投票
                  </p>
                  <p>
                    <strong>2. 关注&ldquo;我是谁&rdquo;而非&ldquo;我想要什么&rdquo;：</strong> &ldquo;我是一个跑步者&rdquo;比&ldquo;我想跑步&rdquo;更有力量
                  </p>
                  <p>
                    <strong>3. 积累小赢：</strong> 不需要完美，只需要持续地证明你的新身份
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => {
                  setStep(0);
                  setIdentity({
                    desiredIdentity: '',
                    currentBehaviors: [],
                    newHabits: [],
                    evidences: []
                  });
                }}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl py-4 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                创建新身份
              </button>
              <button
                onClick={onBack}
                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl py-4 font-semibold hover:shadow-lg transition-all"
              >
                返回首页
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  const text = `我的身份驱动习惯系统\n\n` +
                    `理想身份：${identity.desiredIdentity}\n\n` +
                    `支持这个身份的行为：\n${identity.currentBehaviors.map(b => `• ${b}`).join('\n')}\n\n` +
                    `要养成的习惯：\n${identity.newHabits.map(h => `• ${h}`).join('\n')}\n\n` +
                    `身份证据：\n${identity.evidences.map(e => `• ${e}`).join('\n')}`;
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

  const currentStepData = steps[step];
  const colorClasses = getColorClasses(currentStepData.color);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-purple-900 py-12 px-4">
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
                身份驱动习惯系统
              </h1>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                步骤 {step + 1} / {steps.length + 1}
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              {[...Array(steps.length + 1)].map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    index <= step ? colorClasses.bg : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{currentStepData.icon}</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {currentStepData.title}
              </h2>
              <p className={`${colorClasses.text} dark:text-${currentStepData.color}-400 text-lg`}>
                {currentStepData.subtitle}
              </p>
            </div>

            {step === 0 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    你想成为什么样的人？
                  </label>
                  <input
                    type="text"
                    value={identity.desiredIdentity}
                    onChange={(e) => setIdentity({ ...identity, desiredIdentity: e.target.value })}
                    placeholder="例如：健康的人、作家、有组织的人"
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:text-white transition-all"
                  />
                </div>

                <div className={`${colorClasses.lightBg} rounded-xl p-6`}>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">💡 身份示例</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {identityExamples.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setIdentity({ ...identity, desiredIdentity: example.identity })}
                        className="text-left bg-white dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-all border-2 border-transparent hover:border-blue-300"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{example.icon}</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{example.identity}</span>
                        </div>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          {example.habits.slice(0, 2).map((habit, i) => (
                            <li key={i}>• {habit}</li>
                          ))}
                        </ul>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>提示：</strong> 从结果倒推身份。不要说&ldquo;我想跑马拉松&rdquo;，而说&ldquo;我想成为一个跑步者&rdquo;
                  </p>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4">
                  <p className="text-gray-900 dark:text-white font-medium">
                    理想身份：<span className="text-blue-600 dark:text-blue-400">{identity.desiredIdentity}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {identity.desiredIdentity}会做什么？列出所有相关的行为
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addItem('currentBehaviors')}
                      placeholder="例如：早起运动、选择健康食物"
                      className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:text-white transition-all"
                    />
                    <button
                      onClick={() => addItem('currentBehaviors')}
                      className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
                    >
                      添加
                    </button>
                  </div>

                  {identity.currentBehaviors.length > 0 && (
                    <div className="space-y-2">
                      {identity.currentBehaviors.map((behavior, index) => (
                        <div key={index} className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                          <span className="text-gray-800 dark:text-gray-200">{behavior}</span>
                          <button
                            onClick={() => removeItem('currentBehaviors', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>提示：</strong> 不要担心你现在是否做到了这些，只是列出这个身份应该有的行为
                  </p>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4">
                  <p className="text-gray-900 dark:text-white font-medium">
                    理想身份：<span className="text-blue-600 dark:text-blue-400">{identity.desiredIdentity}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    从上面的行为中，选择你要开始的习惯（从最小的开始）
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addItem('newHabits')}
                      placeholder="例如：每天早上散步10分钟"
                      className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:text-white transition-all"
                    />
                    <button
                      onClick={() => addItem('newHabits')}
                      className="px-6 py-3 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition-colors"
                    >
                      添加
                    </button>
                  </div>

                  {identity.newHabits.length > 0 && (
                    <div className="space-y-2">
                      {identity.newHabits.map((habit, index) => (
                        <div key={index} className="flex items-center justify-between bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                          <span className="text-gray-800 dark:text-gray-200">{habit}</span>
                          <button
                            onClick={() => removeItem('newHabits', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>提示：</strong> 每个小行为都是对你新身份的一次投票。从最容易的开始！
                  </p>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4">
                  <p className="text-gray-900 dark:text-white font-medium">
                    理想身份：<span className="text-blue-600 dark:text-blue-400">{identity.desiredIdentity}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    如何追踪和证明你正在成为{identity.desiredIdentity}？
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addItem('evidences')}
                      placeholder="例如：在日历上记录每次运动"
                      className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:text-white transition-all"
                    />
                    <button
                      onClick={() => addItem('evidences')}
                      className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                    >
                      添加
                    </button>
                  </div>

                  {identity.evidences.length > 0 && (
                    <div className="space-y-2">
                      {identity.evidences.map((evidence, index) => (
                        <div key={index} className="flex items-center justify-between bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                          <span className="text-gray-800 dark:text-gray-200">{evidence}</span>
                          <button
                            onClick={() => removeItem('evidences', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>提示：</strong> 可视化的证据很重要！可以是打卡记录、照片、日记等
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="flex gap-4 mt-8">
            {step > 0 && (
              <button
                onClick={handleBack}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                上一步
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                canProceed()
                  ? `${colorClasses.bg} text-white hover:shadow-lg`
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              {step === steps.length - 1 ? '完成' : '下一步'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
