'use client';

import { useState } from 'react';

interface TwoMinuteRuleFrameworkProps {
  onBack: () => void;
}

interface HabitScale {
  ultimate: string;
  advanced: string;
  intermediate: string;
  beginning: string;
  twoMinute: string;
}

export default function TwoMinuteRuleFramework({ onBack }: TwoMinuteRuleFrameworkProps) {
  const [habits, setHabits] = useState<HabitScale[]>([]);
  const [currentHabit, setCurrentHabit] = useState<HabitScale>({
    ultimate: '',
    advanced: '',
    intermediate: '',
    beginning: '',
    twoMinute: ''
  });
  const [step, setStep] = useState(0);

  const exampleHabits = [
    {
      name: '跑步习惯',
      icon: '🏃',
      scale: {
        ultimate: '跑完马拉松',
        advanced: '每周跑5次，每次10公里',
        intermediate: '每周跑3次，每次5公里',
        beginning: '每周跑2次，每次20分钟',
        twoMinute: '穿上跑鞋'
      }
    },
    {
      name: '阅读习惯',
      icon: '📚',
      scale: {
        ultimate: '每月读完4本书',
        advanced: '每天阅读30分钟',
        intermediate: '每天阅读15分钟',
        beginning: '每天阅读5分钟',
        twoMinute: '打开书，读一页'
      }
    },
    {
      name: '冥想习惯',
      icon: '🧘',
      scale: {
        ultimate: '每天冥想60分钟',
        advanced: '每天冥想30分钟',
        intermediate: '每天冥想15分钟',
        beginning: '每天冥想5分钟',
        twoMinute: '坐到冥想垫上'
      }
    },
    {
      name: '健身习惯',
      icon: '💪',
      scale: {
        ultimate: '完成高强度训练计划',
        advanced: '每周锻炼5次，每次60分钟',
        intermediate: '每周锻炼3次，每次30分钟',
        beginning: '每周锻炼2次，每次15分钟',
        twoMinute: '做1个俯卧撑'
      }
    }
  ];

  const saveHabit = () => {
    if (currentHabit.twoMinute && currentHabit.ultimate) {
      setHabits([...habits, currentHabit]);
      setCurrentHabit({
        ultimate: '',
        advanced: '',
        intermediate: '',
        beginning: '',
        twoMinute: ''
      });
      setStep(0);
    }
  };

  const deleteHabit = (index: number) => {
    setHabits(habits.filter((_, i) => i !== index));
  };

  const loadExample = (example: typeof exampleHabits[0]) => {
    setCurrentHabit(example.scale);
    setStep(1);
  };

  if (step === 0 && habits.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-black dark:to-orange-900 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
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
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">⚡</div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                你的2分钟习惯启动器
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                已创建 {habits.length} 个习惯规模化路径
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {habits.map((habit, index) => (
                <div key={index} className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-xl p-6 border-2 border-orange-200 dark:border-orange-800">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      习惯 #{index + 1}
                    </h3>
                    <button
                      onClick={() => deleteHabit(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        ⚡
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">2分钟版本（从这里开始！）</div>
                        <div className="text-lg font-bold text-green-600 dark:text-green-400">{habit.twoMinute}</div>
                      </div>
                    </div>

                    {habit.beginning && (
                      <div className="flex items-start gap-3 pl-11">
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">初级版本</div>
                          <div className="text-gray-700 dark:text-gray-300">{habit.beginning}</div>
                        </div>
                      </div>
                    )}

                    {habit.intermediate && (
                      <div className="flex items-start gap-3 pl-11">
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">中级版本</div>
                          <div className="text-gray-700 dark:text-gray-300">{habit.intermediate}</div>
                        </div>
                      </div>
                    )}

                    {habit.advanced && (
                      <div className="flex items-start gap-3 pl-11">
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">高级版本</div>
                          <div className="text-gray-700 dark:text-gray-300">{habit.advanced}</div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        🎯
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">终极目标</div>
                        <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{habit.ultimate}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl py-4 font-semibold hover:shadow-lg transition-all"
              >
                ➕ 创建新习惯
              </button>
              <button
                onClick={() => {
                  const text = habits.map((habit, index) => 
                    `习惯 #${index + 1}\n` +
                    `⚡ 2分钟版本：${habit.twoMinute}\n` +
                    (habit.beginning ? `初级：${habit.beginning}\n` : '') +
                    (habit.intermediate ? `中级：${habit.intermediate}\n` : '') +
                    (habit.advanced ? `高级：${habit.advanced}\n` : '') +
                    `🎯 终极目标：${habit.ultimate}`
                  ).join('\n\n');
                  navigator.clipboard.writeText(text);
                  alert('已复制到剪贴板！');
                }}
                className="px-6 py-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                📋 复制
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-black dark:to-orange-900 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8">
          <button
            onClick={habits.length > 0 ? () => setStep(0) : onBack}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {habits.length > 0 ? '返回习惯列表' : '返回框架选择'}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="mb-8 text-center">
            <div className="text-6xl mb-4">⚡</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              2分钟启动器
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              将习惯简化到2分钟内完成，降低开始的门槛
            </p>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">💡 2分钟法则</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              当你开始一个新习惯时，它应该少于2分钟。关键是让习惯容易开始，养成出现的习惯。
            </p>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border-l-4 border-orange-500">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>例如：</strong> &ldquo;每天跑步30分钟&rdquo; → &ldquo;穿上跑鞋&rdquo;<br/>
                先掌握出现的艺术，再优化出现后的行为。
              </p>
            </div>
          </div>

          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                📚 从示例开始
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {exampleHabits.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => loadExample(example)}
                    className="text-left bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-xl p-6 hover:shadow-lg transition-all border-2 border-transparent hover:border-orange-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{example.icon}</span>
                      <span className="font-bold text-gray-900 dark:text-white text-lg">{example.name}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      ⚡ 2分钟版本：<span className="text-green-600 dark:text-green-400 font-medium">{example.scale.twoMinute}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      🎯 最终目标：<span className="text-purple-600 dark:text-purple-400 font-medium">{example.scale.ultimate}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={() => setStep(1)}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl px-8 py-4 font-semibold hover:shadow-lg transition-all"
                >
                  或者创建自定义习惯
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  🎯 最终目标（你理想中的习惯）
                </label>
                <input
                  type="text"
                  value={currentHabit.ultimate}
                  onChange={(e) => setCurrentHabit({ ...currentHabit, ultimate: e.target.value })}
                  placeholder="例如：每天跑步30分钟"
                  className="w-full px-4 py-3 border-2 border-purple-300 dark:border-purple-600 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:bg-gray-700 dark:text-white transition-all"
                />
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  现在让我们将这个习惯分解成更小的版本（可选，但建议填写以便逐步提升）
                </p>

                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    高级版本
                  </label>
                  <input
                    type="text"
                    value={currentHabit.advanced}
                    onChange={(e) => setCurrentHabit({ ...currentHabit, advanced: e.target.value })}
                    placeholder="例如：每周跑5次，每次5公里"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-orange-400 focus:ring-1 focus:ring-orange-200 dark:bg-gray-700 dark:text-white transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    中级版本
                  </label>
                  <input
                    type="text"
                    value={currentHabit.intermediate}
                    onChange={(e) => setCurrentHabit({ ...currentHabit, intermediate: e.target.value })}
                    placeholder="例如：每周跑3次，每次2公里"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-orange-400 focus:ring-1 focus:ring-orange-200 dark:bg-gray-700 dark:text-white transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    初级版本
                  </label>
                  <input
                    type="text"
                    value={currentHabit.beginning}
                    onChange={(e) => setCurrentHabit({ ...currentHabit, beginning: e.target.value })}
                    placeholder="例如：每周跑2次，每次10分钟"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-orange-400 focus:ring-1 focus:ring-orange-200 dark:bg-gray-700 dark:text-white transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ⚡ 2分钟版本（最重要！从这里开始）
                </label>
                <input
                  type="text"
                  value={currentHabit.twoMinute}
                  onChange={(e) => setCurrentHabit({ ...currentHabit, twoMinute: e.target.value })}
                  placeholder="例如：穿上跑鞋"
                  className="w-full px-4 py-3 border-2 border-green-300 dark:border-green-600 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:bg-gray-700 dark:text-white transition-all"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  💡 提示：想一个超级简单的动作，让你进入&ldquo;习惯模式&rdquo;
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">🎯 规模化路径原理</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• <strong>阶段1：</strong> 先掌握2分钟版本，养成出现的习惯</li>
                  <li>• <strong>阶段2：</strong> 习惯建立后，自然进阶到初级版本</li>
                  <li>• <strong>阶段3：</strong> 逐步提升到中级、高级和终极目标</li>
                  <li>• <strong>关键：</strong> 不要跳过前面的阶段，稳扎稳打</li>
                </ul>
              </div>

              {currentHabit.twoMinute && currentHabit.ultimate && (
                <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">✨ 你的习惯规模化路径</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">⚡</span>
                      <span className="text-green-600 dark:text-green-400 font-bold">{currentHabit.twoMinute}</span>
                      <span className="text-gray-500 text-sm">← 从这里开始</span>
                    </div>
                    {currentHabit.beginning && (
                      <div className="flex items-center gap-2 pl-8">
                        <span>→</span>
                        <span className="text-gray-700 dark:text-gray-300">{currentHabit.beginning}</span>
                      </div>
                    )}
                    {currentHabit.intermediate && (
                      <div className="flex items-center gap-2 pl-8">
                        <span>→</span>
                        <span className="text-gray-700 dark:text-gray-300">{currentHabit.intermediate}</span>
                      </div>
                    )}
                    {currentHabit.advanced && (
                      <div className="flex items-center gap-2 pl-8">
                        <span>→</span>
                        <span className="text-gray-700 dark:text-gray-300">{currentHabit.advanced}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🎯</span>
                      <span className="text-purple-600 dark:text-purple-400 font-bold">{currentHabit.ultimate}</span>
                      <span className="text-gray-500 text-sm">← 最终目标</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(0)}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  返回
                </button>
                <button
                  onClick={saveHabit}
                  disabled={!currentHabit.twoMinute || !currentHabit.ultimate}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                    currentHabit.twoMinute && currentHabit.ultimate
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:shadow-lg'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {habits.length > 0 ? '添加到列表' : '创建习惯'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
