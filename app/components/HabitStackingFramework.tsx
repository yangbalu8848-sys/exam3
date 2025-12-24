'use client';

import { useState } from 'react';

interface HabitStackingFrameworkProps {
  onBack: () => void;
}

interface HabitStack {
  existingHabit: string;
  newHabit: string;
  location: string;
  time: string;
  formula: string;
}

export default function HabitStackingFramework({ onBack }: HabitStackingFrameworkProps) {
  const [stacks, setStacks] = useState<HabitStack[]>([]);
  const [currentStack, setCurrentStack] = useState<HabitStack>({
    existingHabit: '',
    newHabit: '',
    location: '',
    time: '',
    formula: ''
  });
  const [step, setStep] = useState(0);

  const saveStack = () => {
    if (currentStack.existingHabit && currentStack.newHabit) {
      const finalStack = { ...currentStack };
      if (!finalStack.formula) {
        finalStack.formula = `在我[${finalStack.existingHabit}]之后，我会${finalStack.location ? `在[${finalStack.location}]` : ''}[${finalStack.newHabit}]`;
      }
      setStacks([...stacks, finalStack]);
      setCurrentStack({
        existingHabit: '',
        newHabit: '',
        location: '',
        time: '',
        formula: ''
      });
      setStep(0);
    }
  };

  const deleteStack = (index: number) => {
    setStacks(stacks.filter((_, i) => i !== index));
  };

  const commonHabits = [
    '早上起床后',
    '刷牙后',
    '喝完早晨的咖啡后',
    '吃完午饭后',
    '下班到家后',
    '吃完晚饭后',
    '准备睡觉前',
    '关掉闹钟后',
    '坐到办公桌前后',
    '锁上家门后'
  ];

  if (step === 0 && stacks.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-green-900 py-12 px-4">
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
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🔗</div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                你的习惯堆叠链
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                已创建 {stacks.length} 个习惯堆叠
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {stacks.map((stack, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </span>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          习惯堆叠公式
                        </h3>
                      </div>
                      <p className="text-lg text-gray-800 dark:text-gray-200 font-medium mb-4">
                        {stack.formula}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">现有习惯：</span>
                          <span className="text-gray-800 dark:text-gray-200 ml-2">{stack.existingHabit}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">新习惯：</span>
                          <span className="text-gray-800 dark:text-gray-200 ml-2">{stack.newHabit}</span>
                        </div>
                        {stack.location && (
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">地点：</span>
                            <span className="text-gray-800 dark:text-gray-200 ml-2">{stack.location}</span>
                          </div>
                        )}
                        {stack.time && (
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">时间：</span>
                            <span className="text-gray-800 dark:text-gray-200 ml-2">{stack.time}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteStack(index)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 ml-4"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl py-4 font-semibold hover:shadow-lg transition-all"
              >
                ➕ 添加新的习惯堆叠
              </button>
              <button
                onClick={() => {
                  const text = stacks.map((stack, index) => 
                    `${index + 1}. ${stack.formula}`
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-purple-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <button
            onClick={stacks.length > 0 ? () => setStep(0) : onBack}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {stacks.length > 0 ? '返回习惯列表' : '返回框架选择'}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="mb-8 text-center">
            <div className="text-6xl mb-4">🔗</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              习惯堆叠规划器
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              将新习惯与现有习惯绑定，让养成习惯变得更容易
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">💡 习惯堆叠原理</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              习惯堆叠是一种特殊的执行意图，利用现有习惯作为新习惯的触发器。
            </p>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="font-medium text-gray-900 dark:text-white mb-2">公式：</p>
              <p className="text-blue-600 dark:text-blue-400 font-bold">
                在我[现有习惯]之后，我会[新习惯]
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                1. 选择一个现有的稳定习惯（触发器）
              </label>
              <input
                type="text"
                value={currentStack.existingHabit}
                onChange={(e) => setCurrentStack({ ...currentStack, existingHabit: e.target.value })}
                placeholder="例如：喝完早晨的咖啡"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:text-white transition-all mb-3"
              />
              <div className="flex flex-wrap gap-2">
                {commonHabits.map((habit, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStack({ ...currentStack, existingHabit: habit })}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {habit}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                2. 你想建立的新习惯
              </label>
              <input
                type="text"
                value={currentStack.newHabit}
                onChange={(e) => setCurrentStack({ ...currentStack, newHabit: e.target.value })}
                placeholder="例如：冥想5分钟"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:text-white transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  3. 地点（可选）
                </label>
                <input
                  type="text"
                  value={currentStack.location}
                  onChange={(e) => setCurrentStack({ ...currentStack, location: e.target.value })}
                  placeholder="例如：客厅"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:text-white transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  4. 大约时间（可选）
                </label>
                <input
                  type="text"
                  value={currentStack.time}
                  onChange={(e) => setCurrentStack({ ...currentStack, time: e.target.value })}
                  placeholder="例如：早上7:30"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:text-white transition-all"
                />
              </div>
            </div>

            {currentStack.existingHabit && currentStack.newHabit && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">✨ 你的习惯堆叠公式</h3>
                <p className="text-xl text-gray-900 dark:text-white font-medium">
                  在我<span className="text-blue-600 dark:text-blue-400">[{currentStack.existingHabit}]</span>之后，
                  我会{currentStack.location && <span className="text-purple-600 dark:text-purple-400">在[{currentStack.location}]</span>}
                  <span className="text-green-600 dark:text-green-400">[{currentStack.newHabit}]</span>
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">📝 习惯堆叠建议</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• 选择每天都会做的稳定习惯作为触发器</li>
              <li>• 新习惯应该简短易行（2-5分钟最佳）</li>
              <li>• 可以创建习惯链：习惯A → 习惯B → 习惯C</li>
              <li>• 确保新旧习惯在时间和地点上是顺畅的</li>
            </ul>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={saveStack}
              disabled={!currentStack.existingHabit || !currentStack.newHabit}
              className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
                currentStack.existingHabit && currentStack.newHabit
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              {stacks.length > 0 ? '添加到列表' : '创建习惯堆叠'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
